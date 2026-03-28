import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService, teacherService } from '../services/api';

function Dashboard() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [formData, setFormData] = useState({
        university_name: '',
        gender: '',
        year_joined: ''
    });

    // Fetch user profile on component mount
    useEffect(() => {
        fetchUserProfile();
        fetchTeacherProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await authService.getUserProfile();
            if (response.data.success) {
                setUser(response.data.data);
                // Update localStorage
                localStorage.setItem('user', JSON.stringify(response.data.data));
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchTeacherProfile = async () => {
        try {
            const response = await teacherService.getProfile();
            if (response.data.success && response.data.data) {
                setTeacher(response.data.data);
                setFormData({
                    university_name: response.data.data.university_name || '',
                    gender: response.data.data.gender || '',
                    year_joined: response.data.data.year_joined || ''
                });
            }
        } catch (error) {
            // 404 means no teacher profile yet - that's okay
            if (error.response?.status !== 404) {
                console.error('Error fetching teacher profile:', error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await teacherService.saveProfile(formData);
            
            if (response.data.success) {
                toast.success('Teacher profile saved successfully!');
                fetchTeacherProfile(); // Refresh data
            }
        } catch (error) {
            console.error('Error saving teacher profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <h1 className="text-2xl font-bold">
                    Welcome, {user.first_name} {user.last_name}!
                </h1>
                <p className="mt-2 text-blue-100">
                    Manage your teacher profile and view your information
                </p>
            </div>

            {/* User Information Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    User Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-500">First Name</label>
                        <p className="text-gray-800 font-medium">{user.first_name}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Last Name</label>
                        <p className="text-gray-800 font-medium">{user.last_name}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">Email Address</label>
                        <p className="text-gray-800 font-medium">{user.email}</p>
                    </div>
                    <div>
                        <label className="text-sm text-gray-500">User ID</label>
                        <p className="text-gray-800 font-medium">#{user.id}</p>
                    </div>
                </div>
            </div>

            {/* Teacher Profile Form Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                    {teacher ? 'Update Teacher Profile' : 'Create Teacher Profile'}
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            University Name
                        </label>
                        <input
                            type="text"
                            name="university_name"
                            value={formData.university_name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter university name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Year Joined
                        </label>
                        <input
                            type="number"
                            name="year_joined"
                            value={formData.year_joined}
                            onChange={handleChange}
                            required
                            min="1900"
                            max={new Date().getFullYear()}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter joining year"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {loading ? 'Saving...' : (teacher ? 'Update Profile' : 'Create Profile')}
                    </button>
                </form>

                {teacher && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <h3 className="font-semibold text-gray-700 mb-2">Existing Profile:</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <span className="text-gray-500">University:</span>
                            <span className="text-gray-800">{teacher.university_name}</span>
                            <span className="text-gray-500">Gender:</span>
                            <span className="text-gray-800 capitalize">{teacher.gender}</span>
                            <span className="text-gray-500">Year Joined:</span>
                            <span className="text-gray-800">{teacher.year_joined}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;