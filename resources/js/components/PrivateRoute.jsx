import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    
    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    // If token exists, render the child component
    return children;
}

export default PrivateRoute;