<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get all users with their teacher profiles
     * GET /api/users
     */
    public function index()
    {
        try {
            // Get all users with teacher relationship
            $users = User::with('teacher')->get();
            
            return response()->json([
                'success' => true,
                'data' => $users
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Get single user with teacher profile
     * GET /api/users/{id}
     */
    public function show($id)
    {
        try {
            $user = User::with('teacher')->find($id);
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404);
            }
            
            return response()->json([
                'success' => true,
                'data' => $user
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}