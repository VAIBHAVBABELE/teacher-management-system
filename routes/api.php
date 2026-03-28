<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication token)
Route::middleware('auth:sanctum')->group(function () {
    // Get logged-in user profile
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    
    // Logout (revoke token)
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Teacher profile management
    Route::post('/teacher-profile', [TeacherController::class, 'store']);
    Route::get('/teacher-profile', [TeacherController::class, 'show']);
    
    // Get all teachers with user data
    Route::get('/teachers', [TeacherController::class, 'index']);

    // Get all users (for admin purposes)
    Route::get('/users', [UserController::class, 'index']);
});