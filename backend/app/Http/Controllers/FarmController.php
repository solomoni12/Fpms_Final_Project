<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use App\Models\OwnerInput;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Resources\FarmResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreFarmRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
// use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class FarmController extends Controller
{
    use HttpResponses;


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // return FarmResource::collection(
        //     Farm::where('user_id',Auth::user()->id)->get()
        // );
        $farm = Farm::where('user_id',Auth::user()->id)->get();
        return $this->success([
            'user' => $farm
        ]);
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
    public function store(StoreFarmRequest $request)
    {
        $request->validated($request->all());

        $farm = Farm::create([
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'location' => $request->location,
            'land_title' => $request->land_title,
            'size' => $request->size
        ]);

        return new FarmResource($farm);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Farm $farm)
    {
        return $this->isNotAuthorized($farm) ? $this->isNotAuthorized($farm) : new FarmResource($farm);
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
    public function update(Request $request, Farm $farm)
    {
        if(Auth::user()->id !== $farm->user_id){
            return $this->error('','You are not Authorized to make request',403);
        }
        
        $farm->update($request->all());

        return new FarmResource($farm);
    }

    // Function to Calculate Total Size of Land For User
    public function getTotalFarmSize(){
        $user = auth()->user();
        $farms = $user->farm;
        $totalSize = 0;
    
        foreach ($farms as $farm) {
            
            $totalSize += $farm->size;
        }
    
        return response()->json(['total_land_size_of_user' => $totalSize]);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

     public function destroy($id)
{
    try {
        // Find the farm with the given id
        $farm = Farm::findOrFail($id);

        if ($this->isNotAuthorized($farm)) {
            return $this->isNotAuthorized($farm);
        }

        // Delete all the farm assignments associated with the farm
        $farm->farmAssigment()->delete();

        // Delete all the ownerinputs associated with the farm
        $ownerinputs = OwnerInput::whereHas('input', function($query) use ($farm){
            $query->where('farm_id', $farm->id);
        })->get();

        foreach ($ownerinputs as $ownerinput) {
            $ownerinput->delete();
        }

        // Delete the farm
        $farm->delete();

        return response()->json(['message' => 'Farm, its associated farm assignments, and ownerinputs have been deleted.']);

    } catch (\Exception $e) {
        return response()->json(['error'=>'The requested resource was not found.'],404);
    }
}

/*
    public function destroy($id){
        try {
            // Find the farm with the given id
            $farm = Farm::findOrFail($id);
            
            if ($this->isNotAuthorized($farm)) {
                return $this->isNotAuthorized($farm);
            }

            // Delete all the farm assignments associated with the farm
            $farm->farmAssigment()->delete();

            // Delete the farm
            $farm->delete();

            return response()->json(['message' => 'Farm and its associated farm assignments have been deleted.']);
            
        } catch (\Exception $e) {
            return response()->json(['error'=>'The requested resource was not found.'],404);
        }
    }
*/
    private function isNotAuthorized($farm){
         
        if(Auth::user()->id !== $farm->user_id){
            return $this->error('','You are not Authorized to make request',403);
        }
    }
}
