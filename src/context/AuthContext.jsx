import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        console.log('Login data received:', userData);
        const userToStore = {
            ...userData,
            username: userData.username,
            email: userData.email,
            phone: userData.phone,
            roles: userData.roles || [], 
            isSeller: userData.roles?.includes('SELLER') || false, 
            isAdmin: userData.roles?.includes('ADMIN') || false 
            
        };
        console.log('User data to store:', userToStore);
        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
    };

    const updateUser = (userData) => {
        const updatedUser = {
            ...userData,
            roles: userData.roles,
            isSeller: userData.roles.includes('SELLER'),
            isAdmin: userData.roles.includes('ADMIN')
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
         <AuthContext.Provider value={{
            user,
            login,
            logout,
            updateUser,
            setUser,
            isAdmin: user?.roles.includes('ADMIN') || false,
            isSeller: user?.roles.includes('SELLER') || false
        }}>
            {children}
        </AuthContext.Provider>
    );
};
