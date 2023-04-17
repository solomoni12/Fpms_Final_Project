<?php

namespace App\Http\Controllers;

use App\Models\Input;
use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Http\Resources\EquipmentResource;
use App\Http\Requests\StoreEquipmentRequest;

class EquipmentController extends Controller
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
    public function store(StoreEquipmentRequest $request, $inputId){
        $request->validated($request->all());
    
        // Get the authenticated user's id
        $userId = auth()->user()->id;
    
        // Check if the input exists in the database
        $input = Input::find($inputId);
        if (!$input) {
            return response()->json(['message' => 'Input not found'], 404);
        }
    
        // Check if the equipment already exists for this user and input
        $equipment = Equipment::where('user_id', $userId)
            ->where('input_id', $inputId)
            ->first();
        
        if ($equipment) {
            // Update the quantity if equipment exists
            $equipment->quantity += $request->quantity;
            $equipment->save();
        } else {
            // Create new equipment if equipment does not exist
            $equipment = Equipment::create([
                'user_id' => $userId,
                'input_id' => $inputId,
                'quantity' => $request->quantity,
            ]);
        }
    
        return response()->json($equipment, 201);
    }
    
     /*
    public function store(StoreEquipmentRequest $request, $inputId){
        
        $request->validated($request->all());

        // Get the authenticated user's id
        $userId = auth()->user()->id;

        // Check if the input exists in the database
        $input = Input::find($inputId);
        if (!$input) {
            return response()->json(['message' => 'Input not found'], 404);
        }

        $equipment = Equipment::create([
            'user_id' => $userId,
            'input_id' => $inputId,
            'quantity' => $request->quantity,
        ]);

        return response()->json($equipment, 201);
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
    public function update(StoreEquipmentRequest $request, $id){
        // Check if the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    
        // Find the equipment or return error
        $equipment = Equipment::find($id);
        if (!$equipment) {
            return response()->json(['error' => 'Equipment not found'], 404);
        }
    
        // Check if the user is authorized to update this equipment
        if ($equipment->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    
        // Get the input id from the equipment
        $input_id = $equipment->input_id;
    
        // Check if the input exists
        $input = Input::find($input_id);
        if (!$input) {
            return response()->json(['error' => 'Input not found'], 404);
        }
    
    
        // Update the equipment
        $equipment->quantity = $request->input('quantity');
        $equipment->save();
    
        return response()->json($equipment);
    }
    
    


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        try {
            // Find the equipment with the given id
            $equipment = Equipment::findOrFail($id);
    
            // Check if the logged in user is authorized to delete the equipment
            if (auth()->user()->id !== $equipment->user_id) {
                return response()->json(['error' => 'You are not authorized to perform this action.'], 403);
            }
    
            // Delete the equipment
            $equipment->delete();
    
            return response()->json(['message' => 'Equipment has been deleted.']);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'The requested resource was not found.'], 404);
        }
    }
    
}
