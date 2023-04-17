<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\WorkerResource;
use App\Http\Requests\StoreWorkerRequest;

class WorkerController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return WorkerResource::collection(
            Worker::where('user_id', Auth::user()->id)->get()
        );
        $workers = Worker::with('workerReferee')->get();
        return WorkerResource::collection($workers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreWorkerRequest $request)
    {
        $request->validated($request->all());

        $worker = Worker::create([
            'user_id' => Auth::user()->id,
            'fname' => $request->fname,
            'mname' => $request->mname,
            'lname' => $request->lname,
            'sex' => $request->sex,
            'phone_number' => $request->phone_number,
            'physical_address' => $request->physical_address,
        ]);

        return new WorkerResource($worker);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Worker $worker)
    {
        return $this->isNotAuthorized($worker) ? $this->isNotAuthorized($worker) : new WorkerResource($worker);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Worker $worker)
    {
        if(Auth::user()->id !== $worker->user_id){
            return $this->error('','You are not Authorized to make request',403);
        }
        
        $worker->update($request->all());

        return new WorkerResource($worker);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    /*  Function which delete Worker 
        with their associated worker referee and 
    */

     public function destroy($id) {
        
        // Get the authenticated user
        $user = auth()->user();
        
        // Find the worker for the logged-in user
        $worker = $user->worker()->find($id);
        
        // If worker not found, return 404 response
        if (!$worker) {
            return response()->json(['message' => 'Worker not found.'], 404);
        }
        
        // If the authenticated user is not authorized to delete the worker, return 401 response
        if (!$worker->is($user)) {
            return response()->json(['message' => 'Unauthorized to delete the worker.'], 401);
        }
        
        // Delete all the worker referees associated with the worker
        $worker->workerReferee()->delete();
        
        // Delete all the farm assignments associated with the worker
        $worker->farmAssigment()->delete();
        
        // Delete the worker
        $worker->delete();
        
        return response()->json(['message' => 'Worker, its associated farm assignments and all its associated worker referees have been deleted.']);
    }
    
    
    private function isNotAuthorized($worker){
         
        if(Auth::user()->id !== $worker->user_id){
            return $this->error('','You are not Authorized to make request',403);
        }
    }
}
