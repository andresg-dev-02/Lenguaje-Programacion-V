import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { isAuthenticated, user } = useContext(AuthContext);

    if (!isAuthenticated) {
        // Redirect to home or login if not authenticated
        return <Navigate to="/" replace />;
    }

    const userRole = (user?.role || user?.rol || '').toLowerCase();

    if (requiredRole && userRole !== requiredRole.toLowerCase()) {
        // Redirect to home if user doesn't have the required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
