<?php

namespace App\Http\Controllers;

use App\Models\Crop;
use App\Models\Farm;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Http\Requests\CropRequest;
use App\Http\Resources\CropResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class CropController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function index($farmId){

        $crops = Crop::where('farm_id', $farmId)->get();
        return CropResource::collection($crops);
    }
    
     
     public function crops()
     {
         $user = Auth::user();
         $crops = $user->crops()->get();
     
         return $this->success([
             'crop' => $crops
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

    public function store(CropRequest $request, $farmId){
        
        $request->validated($request->all());

        $farm = Farm::findOrFail($farmId);

        if ($farm->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $existingCrops = Crop::where('farm_id', $farm->id)->get();

        foreach ($existingCrops as $index => $existingCrop) {
            // Check if the Crop and Farm exist in the Product table
            $product = Product::where('crop_id', $existingCrop->id)
                ->where('farm_id', $farm->id)
                ->first();

            if (!$product) {
                return response()->json(['message' => 'Cannot create a new crop. Crop '.$index.' is not found in the Product table'], 400);
            }
            if ($product->status !== 'sold') {
                return response()->json(['message' => 'Cannot create a new crop. Crop '.$index.' status is not "sold"'], 400);
            }
        }

        $crop = Crop::create([
            'farm_id' => $farm->id,
            'crop_name' => $request->crop_name,
            'planting_date' => $request->planting_date,
            'harvest_date' => $request->harvest_date,
            'expected_product' => $request->expected_product
        ]);

        return new CropResource($crop);
    }



/*
    public function store(CropRequest $request, $farmId){
        $request->validated($request->all());

        $farm = Farm::findOrFail($farmId);

        if ($farm->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Check if Farm already has a Crop associated with it
        $existingCrop = Crop::where('farm_id', $farm->id)->first();
        
        if ($existingCrop) {
            // Check if the Crop and Farm exist in the Product table
            $product = Product::where('crop_id', $existingCrop->id)
                ->where('farm_id', $farm->id)
                ->first();

            if (!$product) {
                return response()->json(['message' => 'farm have crop and not harvested'], 400);
            }

            // Check the status from the Product table
            if ($product->status !== 'sold') {
                return response()->json(['message' => 'Cannot create a new crop. The product status is not "sold"'], 400);
            }
        }

        $crop = Crop::create([
            'farm_id' => $farm->id,
            'crop_name' => $request->crop_name,
            'planting_date' => $request->planting_date,
            'harvest_date' => $request->harvest_date,
            'expected_product' => $request->expected_product
        ]);

        return new CropResource($crop);
    }
*/

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Crop $crops)
    {
        return $crops;
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

     public function update(Request $request, $cropId){
        $user = Auth::user();

        $crop = Crop::find($cropId);
        
        if (!$crop) {
            return Response::json(['message' => 'WorkerReferee not found']);
        }
    
        // Update the worker referee with the new data
        $crop->update($request->all());
    
        return new CropResource($crop);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $cropId){
        $user = Auth::user();
        $crop = $user->crops()->find($cropId);
        
        if (!$crop) {
            return Response::json(['message' => 'Crop not found']);
        }
    
        $crop->delete();
        return Response::json(['message' => 'Crop deleted successfully']);
    }
}
