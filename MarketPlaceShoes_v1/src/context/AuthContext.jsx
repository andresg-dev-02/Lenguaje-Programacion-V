import React, { createContext, useState } from 'react';
import api from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('Auth/Login', { email, password }, { useAuth: false });

            if (response.data.isSuccess) {
                const { token, user: userData } = response.data.data;
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
