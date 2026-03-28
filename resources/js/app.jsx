import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';      // ← Add this import
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeachersList from './pages/TeachersList';
import './index.css';
import UsersList from './pages/UsersList';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
                    <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/teachers" 
                        element={
                            <PrivateRoute>
                                <TeachersList />
                            </PrivateRoute>
                        } 
                    />
                    {/* Add Users Route */}
                    <Route 
                        path="/users" 
                        element={
                            <PrivateRoute>
                                <UsersList />
                            </PrivateRoute>
                        } 
                    />
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated ? 
                            <Navigate to="/dashboard" /> : 
                            <Navigate to="/register" />
                        } 
                    />
                </Routes>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Toaster position="top-right" />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);