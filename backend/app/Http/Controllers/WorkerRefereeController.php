<?php

namespace App\Http\Controllers;

use App\Models\Worker;
use Illuminate\Http\Request;
use App\Models\WorkerReferee;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\WorkerRefereeRequest;
use App\Http\Resources\WorkerRefereeResource;

class WorkerRefereeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($workerId)
    {
        $workerReferees = WorkerReferee::where('worker_id', $workerId)->get();
        return WorkerRefereeResource::collection($workerReferees);
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

    //  function to insert Worker Referee data 
     public function store(WorkerRefereeRequest $request, $workerId)
     {
         $request->validated($request->all());
     
         $worker = Worker::findOrFail($workerId);
     
         if ($worker->user_id != Auth::id()) {
             return response()->json(['message' => 'Unauthorized'], 401);
         }
     
         $workerreferee = WorkerReferee::create([
             'worker_id' => $worker->id,
             'fname' => $request->fname,
             'lname' => $request->lname,
             'phone_number' => $request->phone_number,
             'physical_address' => $request->physical_address
         ]);
     
         return new WorkerRefereeResource($workerreferee);
     }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(WorkerReferee $workerreferee)
    {
        //
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
    
    //  Function to update WorkerReferees
    public function update(WorkerRefereeRequest $request, $id, $workerrefereeId){
        $user = Auth::user();
        $worker = $user->worker()->find($id);

        if (!$worker) {
            return Response::json(['message' => 'Worker not found']);
        }

        $workerreferee = $worker->workerReferee()->find($workerrefereeId);
        if (!$workerreferee) {
            return Response::json(['message' => 'WorkerReferee not found']);
        }

        if ($workerreferee->worker_id != $worker->id) {
            return Response::json(['message' => 'Unauthorized']);
        }

        // Update the worker referee with the new data
        $workerreferee->update([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'physical_address' => $request->physical_address
        ]);

        return new WorkerRefereeResource($workerreferee);
    }

    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    //Function to Delete Worker Referee   
     public function destroy(Request $request, $id, $workerrefereeId){
        $user = Auth::user();
        $worker = $user->worker()->find($id);

        if (!$worker) {
            return Response::json(['message' => 'Worker not found']);
        }

        $workerreferee = $worker->workerReferee()->find($workerrefereeId);
        if (!$workerreferee) {
            return Response::json(['message' => 'WorkerReferee not found']);
         }

        if ($workerreferee->worker_id != $worker->id) {
            return Response::json(['message' => 'Unauthorized']);
        }

        $workerreferee->delete();
         return Response::json(['message' => 'WorkerReferee deleted successfully']);
    }
}
