<?php

namespace App\Http\Controllers;

use App\Models\Input;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
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
    public function store(StoreInputRequest $request)
    {
        $request->validated($request->all());
       
        $input = Input::create([
            'name' => $request->name
        ]);

        return new InputResource($input);
    }
    
    // function to get Input with their equipment 
    public function getInputsWithEquipment(){
        
        $inputs = Input::with('equipments')->get();

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
