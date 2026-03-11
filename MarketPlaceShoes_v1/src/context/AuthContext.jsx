import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // For now, we mock the user state. Set to true to access protected routes.
    // In the future, this will tie into the actual login/auth services.
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // Mock user data
    const [user, setUser] = useState({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe&background=random',
        role: 'admin' // can be 'user' or 'admin' 
    });

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
