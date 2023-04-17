<?php

namespace App\Http\Controllers;

use App\Models\Input;
use App\Models\OwnerInput;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\OwnerInputResource;
use App\Http\Requests\StoreOwnerInputRequest;

class OwnerInputController extends Controller
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

    public function store(StoreOwnerInputRequest $request, $farmId, $inputId){
            
        $request->validated($request->all());

        // Find the logged-in user's farm and input
        $farm = auth()->user()->farm()->find($farmId);
        $input = Input::find($inputId);

        // Check if farm and input exist
        if (!$farm) {
            return response()->json(['message' => 'Farm not found'], 404);
        }

        if (!$input) {
            return response()->json(['message' => 'Input not found'], 404);
        }

        // Check if the combination of farm_id and input_id already exists
        $existingOwnerInput = OwnerInput::where('farm_id', $farmId)
            ->where('input_id', $inputId)
            ->first();

        if ($existingOwnerInput) {
            return response()->json(['message' => 'OwnerInput already exists'], 409);
        }

        // Create a new OwnerInput associated with the farm and input
        $ownerInput = $farm->ownerInput()->create([
            'input_id' => $input->id,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        // Return the newly created OwnerInput resource
        return new OwnerInputResource($ownerInput);
    }
    
    /*
    public function store(StoreOwnerInputRequest $request, $farmId, $inputId){
    $request->validated($request->all());

    // Find the logged-in user's farm and input
    $farm = auth()->user()->farm()->find($farmId);
    $input = Input::find($inputId);

    // Check if farm and input exist
    if (!$farm) {
        return response()->json(['message' => 'Farm not found'], 404);
    }

    if (!$input) {
        return response()->json(['message' => 'Input not found'], 404);
    }

    // Check if the combination of farm_id and input_id already exists
    $existingOwnerInput = OwnerInput::where('farm_id', $farmId)
        ->where('input_id', $inputId)
        ->first();

    if ($existingOwnerInput) {
        return response()->json(['message' => 'OwnerInput already exists'], 409);
    }

    // Create a new OwnerInput associated with the farm and input
    $ownerInput = $farm->ownerInput()->create([
        'input_id' => $input->id,
        'price' => $request->price,
        'quantity' => $request->quantity,
    ]);

    // Return the newly created OwnerInput resource
    return new OwnerInputResource($ownerInput);
}
*/
    

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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
