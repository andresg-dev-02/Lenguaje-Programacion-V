import React, { createContext, useState } from 'react';
import api from '../api/axiosInstance';

export const AuthContext = createContext();

const decodeJWT = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT", e);
        return null;
    }
};

const getStoredUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        if (userStr && userStr !== 'undefined' && userStr !== 'null') {
            return JSON.parse(userStr);
        }
    } catch (e) {
        console.error("Error parsing user from localStorage", e);
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(getStoredUser());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('Auth/Login', { email, contraseña: password }, { useAuth: false });

            if (response.data.isSuccess) {
                const { token } = response.data.data;
                const payload = decodeJWT(token);

                const emailClaim = payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || email;
                const roleClaim = payload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || 'User';

                const userData = {
                    email: emailClaim,
                    name: emailClaim.split('@')[0],
                    role: roleClaim,
                    avatar: 'https://ui-avatars.com/api/?name=' + emailClaim.split('@')[0]
                };

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                setIsAuthenticated(true);
                setUser(userData);
                setLoading(false);
                return { success: true };
            } else {
                setError(response.data.message);
                setLoading(false);
                return { success: false, message: response.data.message };
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Error de conexión';
            setError(message);
            setLoading(false);
            return { success: false, message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
