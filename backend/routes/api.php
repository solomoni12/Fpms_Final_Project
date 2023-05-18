<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CropController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\InputController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\WorkerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\OwnerInputController;
use App\Http\Controllers\FarmAssigmentController;
use App\Http\Controllers\WorkerRefereeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// public route
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', [AuthController::class, 'user']);

// protected route
Route::group(['middleware' => ['auth:sanctum']], function (){
    Route::get('/logged', [AuthController::class, 'logged_user']);
    Route::post('/changepassword', [AuthController::class, 'change_password']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/farms',FarmController::class);
    Route::resource('/inputs',InputController::class);
    Route::resource('/products',ProductController::class);
    Route::resource('/workers',WorkerController::class);
    Route::resource('/crops',CropController::class);
    Route::resource('/referees',WorkerRefereeController::class);
    Route::resource('/equipments',EquipmentController::class);
    Route::put('/referees/{refereeId}', [WorkerRefereeController::class, 'update']);
    Route::delete('/referees/{id}', [WorkerRefereeController::class, 'destroy']);
    Route::post('/workers/{workerId}/referees', [WorkerRefereeController::class,'store']);
    Route::post('/workers/{workerId}/farms/{farmId}/assignments', [FarmAssigmentController::class, 'store']);
    Route::put('/assignments/{id}', [FarmAssigmentController::class, 'update']);
    Route::delete('/assignments/{id}', [FarmAssigmentController::class, 'destroy']);
    Route::get('/workers/{worker_id}/assignments', [FarmAssigmentController::class, 'availableAssigment']);
    Route::get('/assignments/{worker_id}', [FarmAssigmentController::class, 'availableAssigmentWorker']);
    Route::get('/total-size', [FarmController::class, 'getTotalFarmSize'])->name('farms.total-size');
    Route::post('/inputs', [InputController::class, 'store']);
    Route::post('/farms/{farmId}/inputs/{inputId}/owner-inputs', [OwnerInputController::class, 'store']);
    Route::post('/equipments/{inputId}', [EquipmentController::class, 'store']);
    Route::delete('/equipment/{id}', [EquipmentController::class, 'destroy']);
    Route::put('/equipments/{id}', [EquipmentController::class, 'update']);
    Route::get('/workers/{workerId}/referees', [WorkerRefereeController::class, 'getWorkerRefereesForLoggedInUser']);
    Route::get('/workers/{workerId}/workerreferees', [WorkerRefereeController::class, 'index']);
    Route::get('/farms/{farmId}/crops', [CropController::class, 'index']);
    Route::post('/farms/{farmId}/crops', [CropController::class,'store']);
    Route::post('/farms/{farmId}/crops/{cropId}/products', [ProductController::class, 'store']);
    Route::get('farms/{farmId}/products', [ProductController::class,'getAllProduct']);
    Route::get('/crops', [CropController::class, 'crops']);
});