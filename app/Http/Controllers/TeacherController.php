<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Create or update teacher profile for authenticated user
     * POST /api/teacher-profile
     * 
     * Request Body:
     * - university_name (required, string)
     * - gender (required, in:male,female,other)
     * - year_joined (required, integer, min:1900, max:current_year)
     */
    public function store(Request $request)
    {
        // Step 1: Validate request
        $validated = $request->validate([
            'university_name' => 'required|string|max:255',
            'gender' => 'required|in:male,female,other',
            'year_joined' => 'required|integer|min:1900|max:' . date('Y'),
        ]);
        
        // Step 2: Get authenticated user
        $user = $request->user();
        
        // Step 3: Create or update teacher profile
        $teacher = Teacher::updateOrCreate(
            ['user_id' => $user->id],  // Find by user_id
            [                           // Data to update/create with
                'university_name' => $validated['university_name'],
                'gender' => $validated['gender'],
                'year_joined' => $validated['year_joined'],
            ]
        );
        
        // Step 4: Load relationship and return response
        $teacher->load('user');
        
        return response()->json([
            'success' => true,
            'message' => 'Teacher profile saved successfully',
            'data' => $teacher
        ], 200);
    }
    
    /**
     * Get teacher profile of authenticated user
     * GET /api/teacher-profile
     */
    public function show(Request $request)
    {
        // Get teacher profile for current user
        $teacher = $request->user()->teacher;
        
        if (!$teacher) {
            return response()->json([
                'success' => false,
                'message' => 'Teacher profile not found'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $teacher
        ], 200);
    }
    
    /**
     * Get all teachers with user information
     * GET /api/teachers
     */
    public function index()
    {
        // Get all teachers with their associated users
        $teachers = Teacher::with('user')->get();
        
        return response()->json([
            'success' => true,
            'data' => $teachers
        ], 200);
    }
}