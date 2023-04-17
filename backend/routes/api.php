<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FarmController;
use App\Http\Controllers\InputController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\WorkerController;
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
    Route::resource('/workers',WorkerController::class);
    Route::resource('/referees',WorkerRefereeController::class);
    Route::put('/workers/{workerId}/referees/{refereeId}', [WorkerRefereeController::class, 'update']);
    Route::delete('/workers/{worker}/referees/{workerRefereeId}',[WorkerRefereeController::class, 'destroy']);
    Route::post('/workers/{workerId}/referees', [WorkerRefereeController::class,'store']);
    Route::post('/workers/{workerId}/farms/{farmId}/assignments', [FarmAssigmentController::class, 'store']);
    Route::put('/assignments/{id}', [FarmAssigmentController::class, 'update']);
    Route::delete('/assignments/{id}', [FarmAssigmentController::class, 'destroy']);
    Route::get('/assignments/{worker_id}/{farm_id}', [FarmAssigmentController::class, 'availableAssigment']);
    Route::get('/assignments/{worker_id}', [FarmAssigmentController::class, 'availableAssigmentWorker']);
    Route::get('/total-size', [FarmController::class, 'getTotalFarmSize'])->name('farms.total-size');
    Route::post('/inputs', [InputController::class, 'store']);
    Route::post('/farms/{farmId}/inputs/{inputId}/owner-inputs', [OwnerInputController::class, 'store']);
    Route::post('/equipments/{inputId}', [EquipmentController::class, 'store']);
    Route::delete('/equipment/{id}', [EquipmentController::class, 'destroy']);
    Route::put('/equipments/{id}', [EquipmentController::class, 'update']);


});