<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{

    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
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

    //function to retrive all product
    public function getAllProduct($farmId){
        
        $products = Product::where('farm_id', $farmId)->get();
        return ProductResource::collection($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

     public function store(ProductRequest $request, $farmId, $cropId){
        
         try {
             $request->validated();
             $crop = Auth::user()->crops()->firstOrFail();
             $farm = Auth::user()->farm()->findOrFail($farmId);

             $product = Product::create([
                 'crop_id' => $cropId,
                 'farm_id' => $farmId,
                 'product_name' => $request->product_name,
                 'harvest_date' => $request->harvest_date,
                 'quantity' => $request->quantity,
                 'status' => $request->status,
             ]);
     
             return new ProductResource($product);
         } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
             return response()->json(['error' => 'crop or farm not found'], 404);
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
    public function update(Request $request, $productId){

        try {

            $product = Product::findOrFail($productId);
            $product->update($request->all());
    
            return new ProductResource($product);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function destroy($productId){

        try {

            $product = Product::findOrFail($productId);
            $product->delete();
            
            return response()->json(['message' => 'Product deleted successfully']);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        }

    }

}
