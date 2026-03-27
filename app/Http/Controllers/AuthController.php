<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     * POST /api/register
     * 
     * Request Body:
     * - first_name (required, string)
     * - last_name (required, string)
     * - email (required, email, unique)
     * - password (required, min:8)
     * - password_confirmation (required)
     */
    public function register(Request $request)
    {
        // Step 1: Validate incoming request
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        
        // Step 2: Create new user
        $user = User::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        
        // Step 3: Generate API token for the user
        $token = $user->createToken('auth_token')->plainTextToken;
        
        // Step 4: Return response with user data and token
        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer'
            ]
        ], 201);
    }
        // Validation logic will go here
        // User creation logic will go here
        // Token generation logic will go here
    
    
    /**
     * Login user and generate token
     * POST /api/login
     */
    /**
     * Login user and generate token
     * POST /api/login
     * 
     * Request Body:
     * - email (required, email)
     * - password (required)
     */
    public function login(Request $request)
    {
        // Step 1: Validate request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        
        // Step 2: Find user by email
        $user = User::where('email', $request->email)->first();
        
        // Step 3: Check if user exists and password matches
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        
        // Step 4: Delete any existing tokens (optional, for single session)
        // $user->tokens()->delete();
        
        // Step 5: Create new token
        $token = $user->createToken('auth_token')->plainTextToken;
        
        // Step 6: Return response
        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer'
            ]
        ], 200);
    }

    /**
     * Get logged-in user profile with teacher data
     * GET /api/user-profile
     */
    public function userProfile(Request $request)
    {
        // Load teacher relationship with the user
        $user = $request->user()->load('teacher');
        
        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }

    /**
     * Logout user (revoke current token)
     * POST /api/logout
     */
    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ], 200);
    }
}