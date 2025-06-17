<?php

use App\Http\Controllers\Auth\AppAuthController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\CarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/', function (Request $request) {
    return ['message' => 'Hello World'];
});

Route::prefix('auth')->group(function () {
    Route::post('/request-otp', [AppAuthController::class, 'requestOtp']);
    Route::post('/verify-otp', [AppAuthController::class, 'verifyOtp']);
    Route::middleware('auth:sanctum')->post('/logout', [AppAuthController::class, 'logout']);
});

Route::prefix('cars')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [CarController::class, 'index']);
    Route::get('/all', [CarController::class, 'allCars']);
    Route::post('/', [CarController::class, 'store']);
    Route::post('/{car}', [CarController::class, 'update']);
    Route::delete('/{car}', [CarController::class, 'destroy']);
    Route::post('/{car}/approve', [CarController::class, 'approve']);
    Route::post('/{car}/reject', [CarController::class, 'reject']);
    Route::post('/{car}/reset', [CarController::class, 'resetStatus']);
});

Route::middleware('auth:sanctum')->prefix('users')->group(function () {
    Route::get('/', [AdminUserController::class, 'index']);
    Route::put('/{user}', [AdminUserController::class, 'update']);
    Route::delete('/{user}', [AdminUserController::class, 'destroy']);
    Route::post('/{user}/suspend', [AdminUserController::class, 'suspend']);
    Route::post('/{user}/restore', [AdminUserController::class, 'restore']);
});

use App\Http\Controllers\AdminAccountController;

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/admins', [AdminAccountController::class, 'index']);
    Route::post('/admins', [AdminAccountController::class, 'store']);
    Route::put('/admins/{user}', [AdminAccountController::class, 'update']);
    Route::delete('/admins/{user}', [AdminAccountController::class, 'destroy']);
    Route::post('/admins/{user}/suspend', [AdminAccountController::class, 'suspend']);
    Route::post('/admins/{user}/restore', [AdminAccountController::class, 'restore']);
});
