<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'university_name',
        'gender',
        'year_joined',
    ];

    /**
     * Get the user that owns the teacher profile.
     * One-to-One relationship (inverse): Teacher belongs to User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}