<?php

namespace App\Http\Controllers;

use App\Models\Farm;
use App\Models\Worker;
use Illuminate\Http\Request;
use App\Models\FarmAssigment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Http\Requests\FarmAssigmentRequest;
use App\Http\Resources\FarmAssigmentResource;

class FarmAssigmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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

    //Function to Assign work to worker
    public function store(FarmAssigmentRequest $request, $workerId, $farmId){
        try {
            $request->validated();
            $worker = Auth::user()->worker()->findOrFail($workerId);
            $farm = Auth::user()->farm()->findOrFail($farmId);

            // Check if the worker is already assigned to the farm
            $previousAssignment = FarmAssigment::where('worker_id', $workerId)->where('farm_id', $farmId)->latest()->first();
            if ($previousAssignment && ($previousAssignment->status == 'in progress' || $previousAssignment->status == 'incomplete')){
                return response()->json(['error' => 'Worker is already assigned to the farm'], 422);
            }

            $assignment = $worker->farmAssigment()->create([
                'worker_id' => $workerId,
                'farm_id' => $farmId,
                'task_name' => $request->task_name,
                'status' => $request->status,
                'time_start' => $request->time_start,
                'time_assigned' => $request->time_assigned,
                'time_complished' => $request->time_complished
            ]);

            return new FarmAssigmentResource($assignment);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Worker or farm not found'], 404);
        }
    }

        /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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

     public function update(FarmAssigmentRequest $request, $id) {
        try {
            $request->validated();
            $assignment = FarmAssigment::findOrFail($id);
    
            // check if the authenticated user owns the farm associated with the farm assignment
            $farm = $assignment->farm;
            if (Auth::user()->id !== $farm->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // check if the authenticated user owns the worker associated with the farm assignment
            $worker = $assignment->worker;
            if (Auth::user()->id !== $worker->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // check if the status is in progress before allowing an update
            if ($assignment->status !== 'in progress') {
                return response()->json(['error' => 'Cannot update assignment that is not in progress'], 400);
            }
    
            $assignment->update([
                'status' => $request->status,
                'time_complished' => $request->time_complished
            ]);
    
            // rest of the code to calculate time difference and update the assignment
            $assignedTime = strtotime($assignment->time_assigned);
            $completedTime = strtotime($request->time_complished);

            $timeDiff = $completedTime - $assignedTime;

            // Calculate time difference in seconds, minutes, hours, and days
            $timeDiffInSeconds = round($timeDiff);
            $timeDiffInMinutes = round($timeDiff / 60, 2);
            $timeDiffInHours = round($timeDiff / 3600, 2);
            $timeDiffInDays = round($timeDiff / 86400, 2);

            if ($timeDiffInMinutes > 0) {
                // Convert to hours or days if applicable
                if ($timeDiffInMinutes >= 60) {
                    $timeDiffInHours = round($timeDiffInMinutes / 60, 2);
                    if ($timeDiffInHours >= 24) {
                        $timeDiffInDays = round($timeDiffInHours / 24, 2);
                        $result = "Delayed by " . $timeDiffInDays . " days.";
                    } else {
                        $result = "Delayed by " . $timeDiffInHours . " hours.";
                    }
                } else {
                    $result = "Delayed by " . $timeDiffInMinutes . " minutes.";
                }
                $assignment->update(['delayed' => $timeDiffInSeconds]);
                $assignment->update(['ontime' => false]);
            } else {
                $assignment->update(['ontime' => true]);
                $result = "Completed on time.";
            }

            return response()->json([
                'message' => 'Farm assignment status and complished changed successfully.',
                'result' => $result,
                'assignment' => new FarmAssigmentResource($assignment)
            ]);
    
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Farm assignment not found'], 404);
        }
    }
    
/*
     public function update(FarmAssigmentRequest $request, $id) {
        try {
            $request->validated();
            $assignment = FarmAssigment::findOrFail($id);
    
            // check if the authenticated user owns the farm associated with the farm assignment
            $farm = $assignment->farm;
            if (Auth::user()->id !== $farm->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            // check if the authenticated user owns the worker associated with the farm assignment
            $worker = $assignment->worker;
            if (Auth::user()->id !== $worker->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
    
            $assignment->update([
                'status' => $request->status,
                'time_complished' => $request->time_complished
            ]);

            $assignedTime = strtotime($assignment->time_assigned);
            $completedTime = strtotime($request->time_complished);

            $timeDiff = $completedTime - $assignedTime;

            // Calculate time difference in seconds, minutes, hours, and days
            $timeDiffInSeconds = round($timeDiff);
            $timeDiffInMinutes = round($timeDiff / 60, 2);
            $timeDiffInHours = round($timeDiff / 3600, 2);
            $timeDiffInDays = round($timeDiff / 86400, 2);

            if ($timeDiffInMinutes > 0) {
                // Convert to hours or days if applicable
                if ($timeDiffInMinutes >= 60) {
                    $timeDiffInHours = round($timeDiffInMinutes / 60, 2);
                    if ($timeDiffInHours >= 24) {
                        $timeDiffInDays = round($timeDiffInHours / 24, 2);
                        $result = "Delayed by " . $timeDiffInDays . " days.";
                    } else {
                        $result = "Delayed by " . $timeDiffInHours . " hours.";
                    }
                } else {
                    $result = "Delayed by " . $timeDiffInMinutes . " minutes.";
                }
                $assignment->update(['delayed' => $timeDiffInSeconds]);
                $assignment->update(['ontime' => false]);
            } else {
                $assignment->update(['ontime' => true]);
                $result = "Completed on time.";
            }

            return response()->json([
                'message' => 'Farm assignment status and complished changed successfully.',
                'result' => $result,
                'assignment' => new FarmAssigmentResource($assignment)
            ]);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Farm assignment not found'], 404);
        }
    }*/
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        try {
            $assignment = FarmAssigment::findOrFail($id);
            
            // check if the authenticated user owns the farm associated with the farm assignment
            $farm = $assignment->farm;
            if (Auth::user()->id !== $farm->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // check if the authenticated user owns the worker associated with the farm assignment
            $worker = $assignment->worker;
            if (Auth::user()->id !== $worker->user_id) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }
            
            $assignment->delete();
            return response()->json(['message' => 'Farm assignment deleted successfully.']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Farm assignment not found'], 404);
        }
    }

    // Function to Retrive All Farm assigment Based on Farm and Worker
    public function availableAssigment($worker_id, $farm_id){
            try {
                // Get the worker and farm associated with the IDs
                $worker = Worker::where('id', $worker_id)->where('user_id', Auth::user()->id)->firstOrFail();
                $farm = Farm::where('id', $farm_id)->where('user_id', Auth::user()->id)->firstOrFail();
                
                // Get all farm assignments for the worker and farm
                $assignments = FarmAssigment::where('worker_id', $worker->id)->where('farm_id', $farm->id)->get();

                // Return the assignments as a resource collection
                return FarmAssigmentResource::collection($assignments);
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
                return response()->json(['error' => 'Worker or farm not found for the authenticated user'], 404);
            }
    }

        // Function to retrive all Farm Assigment For specific Workers
    public function availableAssigmentWorker($worker_id){
            try {
                // Get the worker associated with the ID
                $worker = Worker::where('id', $worker_id)->where('user_id', Auth::user()->id)->firstOrFail();

                // Get all farms owned by the authenticated user
                $farms = Farm::where('user_id', Auth::user()->id)->pluck('id');

                // Get all farm assignments for the worker and the farms owned by the authenticated user
                $assignments = FarmAssigment::where('worker_id', $worker->id)->whereIn('farm_id', $farms)->get();

                // Return the assignments as a resource collection
                return FarmAssigmentResource::collection($assignments);
            } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
                return response()->json(['error' => 'Worker not found for the authenticated user'], 404);
            }
    }


}
