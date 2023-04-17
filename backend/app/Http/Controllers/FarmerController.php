<?php

namespace App\Http\Controllers;

use App\Models\Farmer;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\FarmerResource;
use App\Http\Requests\StoreFarmerRequest;

class FarmerController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return FarmerResource::collection(
            Farmer::where('user_id', Auth::user()->id)->get()
        );
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
    public function store(StoreFarmerRequest $request)
    {
        $request->validated($request->all());

        $farmer = Farmer::create([
            'user_id' => Auth::user()->id,
            'owned_land_size' => $request->owned_land_size
        ]);

        return new FarmerResource($farmer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Farmer $farmer)
    {
        return $this->isNotAuthorized($farmer) ? $this->isNotAuthorized($farmer) : new FarmerResource($farmer);
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
    public function update(Request $request, Farmer $farmer)
    {
        if(Auth::user()->id !== $farmer->user_id){
            return $this->error('','You are not Authorized to make request',403);
        }
        
        $farmer->update($request->all());

        return new FarmerResource($farmer);
    }
    public function getTotalFarmSize(){
        $user = auth()->user();
        $totalSize = $user->farm()->sum('size');
        return response()->json(['total_farm_size' => $totalSize]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Farmer $farmer)
    {
        return $this->isNotAuthorized($farmer) ? $this->isNotAuthorized($farmer) : $farmer -> delete();
    }

    private function isNotAuthorized($farmer){
         
        if(Auth::user()->id !== $farmer->user_id){
            return $this->error('','You are not Authorized to make request',403);
        }
    }
}
