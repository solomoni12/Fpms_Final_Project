<?php

namespace App\Http\Controllers;

use App\Models\Input;
use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\InputResource;
use App\Http\Requests\StoreInputRequest;

class InputController extends Controller
{
    
    use HttpResponses;
    
    public function index()
    {
        $input = Input::all();
        return $this->success([
            'user' => $input
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

    //  function to store input
    
    public function store(StoreInputRequest $request){

        $validatedData = $request->validated();

        $name = $validatedData['name'];

        // Check if the name exists in the Input table for the authenticated user
        $input = Input::where('name', $name)
            ->whereHas('equipments', function ($query) {
                $query->where('user_id', auth()->user()->id);
            })
            ->first();

        if ($input) {
            $equipment = $input->equipments()
                ->where('user_id', auth()->user()->id)
                ->first();

            if ($equipment) {
                $equipment->quantity += $validatedData['equipment_quantity'];
                $equipment->save();
            } else {
                $equipment = Equipment::create([
                    'user_id' => auth()->user()->id,
                    'input_id' => $input->id,
                    'quantity' => $validatedData['equipment_quantity'],
                ]);
            }
        } else {
            $input = Input::create([
                'name' => $name,
                'quantity' => $validatedData['equipment_quantity'],
            ]);

            $equipment = Equipment::create([
                'user_id' => auth()->user()->id,
                'input_id' => $input->id,
                'quantity' => $validatedData['equipment_quantity'],
            ]);
        }

        return response()->json([
            'input' => $input,
            'equipment' => $equipment,
        ], 201);
    }

    
    // function to get Input with their equipment 
    public function getInputsWithEquipment(){
    
        if (!auth()->check()) {
            return $this->error('', 'Unauthenticated', 401);
        }

        $user = auth()->user();
        $equipmentIds = $user->equipment->pluck('id');

        $inputs = Input::whereHas('equipments', function ($query) use ($equipmentIds) {
            $query->whereIn('id', $equipmentIds);
        })->with('equipments')->get();

        return $this->success([
            'inputs' => $inputs
        ]);
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
    // public function update(Request $request, $id)
    // {
    //     //
    // }
    public function updateInputsWithEquipment(Request $request, $id){
        
       
        $request->validate([
            'input_name' => 'required',
            'equipment_quantity' => 'required'
        ]);

        
        $input = Input::find($id);
        if (!$input) {
            return $this->error('Input not found', 404);
        }

        // Update the input name
        $input->name = $request->input_name;
        $input->save();

        // Find the associated equipment
        $equipment = $input->equipments->first();
        if (!$equipment) {
            return $this->error('Equipment not found', 404);
        }

        // Update the equipment quantity
        $equipment->quantity = $request->equipment_quantity;
        $equipment->save();

        return $this->success([
            'input' => $input,
            'equipment' => $equipment
        ]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($id){

        // Find the input by ID
        $input = Input::find($id);

        // Check if the input exists
        if (!$input) {
            return response()->json(['error' => 'Input not found'], 404);
        }

        // Delete the input
        $input->delete();

        return response()->json(['message' => 'Input deleted successfully']);
    }

}
