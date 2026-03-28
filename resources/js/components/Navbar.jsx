import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/api';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let user = null;
    
    try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            user = JSON.parse(userStr);
        }
    } catch (e) {
        console.error('Error parsing user:', e);
    }

    const handleLogout = async () => {
        try {
            // Call logout API
            await authService.logout();
            
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Show success message
            toast.success('Logged out successfully');
            
            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed');
            
            // Even if API fails, clear local data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }
    };

    return (
        <nav className="bg-blue-600 text-white flex-wrap shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-3 md:py-4">
                    {/* Logo / Brand */}
                    <Link to="/" className="text-xl font-bold hover:text-blue-200 transition flex-col md:flex-row">
                        Teacher Management System
                    </Link>
                    
                    {/* Navigation Links */}
                    <div className="flex space-x-6">
                        {token ? (
                            <>
                                {/* Logged In Links */}
                                <Link 
                                    to="/dashboard" 
                                    className="hover:text-blue-200 transition"
                                >
                                    Dashboard
                                </Link>
                                {/* Add Users Link */}
                                <Link to="/users" className="hover:text-blue-200 transition">
                                    Users
                                </Link>
                                <Link 
                                    to="/teachers" 
                                    className="hover:text-blue-200 transition"
                                >
                                    Teachers
                                </Link>
                                <span className="text-blue-200">
                                    👋 Welcome, {user?.first_name || user?.email || 'User'}
                                </span>
                                <button 
                                    onClick={handleLogout}
                                    className="hover:text-blue-200 transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Logged Out Links */}
                                <Link 
                                    to="/login" 
                                    className="hover:text-blue-200 transition"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="hover:text-blue-200 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;