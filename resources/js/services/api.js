import axios from 'axios';
import toast from 'react-hot-toast';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request Interceptor - Automatically add token to all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized (Token expired or invalid)
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
        }
        // Handle 422 Validation Errors
        else if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            if (errors) {
                Object.values(errors).forEach(err => {
                    if (Array.isArray(err)) {
                        err.forEach(msg => toast.error(msg));
                    } else {
                        toast.error(err);
                    }
                });
            } else if (error.response.data.message) {
                toast.error(error.response.data.message);
            }
        }
        // Handle 500 Server Error
        else if (error.response?.status === 500) {
            toast.error('Server error. Please try again later.');
        }
        // Handle Network Error
        else if (error.code === 'ERR_NETWORK') {
            toast.error('Network error. Please check your connection.');
        }
        // Handle other errors
        else if (error.response?.data?.message) {
            toast.error(error.response.data.message);
        }
        
        return Promise.reject(error);
    }
);

// ============================================
// AUTH SERVICES
// ============================================

export const authService = {
    // Register new user
    register: (data) => api.post('/register', data),
    
    // Login user
    login: (data) => api.post('/login', data),
    
    // Logout user (revoke token)
    logout: () => api.post('/logout'),
    
    // Get logged-in user profile
    getUserProfile: () => api.get('/user-profile'),
};

// ============================================
// TEACHER SERVICES
// ============================================

export const teacherService = {
    // Get teacher profile of logged-in user
    getProfile: () => api.get('/teacher-profile'),
    
    // Create or update teacher profile
    saveProfile: (data) => api.post('/teacher-profile', data),
    
    // Get all teachers with user information
    getAllTeachers: () => api.get('/teachers'),
};

export const userService = {
    // Get all users
    getAllUsers: () => api.get('/users'),
    
    // Get single user by ID
    getUser: (id) => api.get(`/users/${id}`),
};

// Default export for custom axios instance
export default api;