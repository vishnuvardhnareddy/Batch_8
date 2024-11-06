import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const UserContext = createContext();

export const UserProvider = ({ children, navigate }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const URI = import.meta.env.VITE_API_URL;

    // Register and login
    const registerUser = async (username, password) => {
        try {
            const response = await axios.post(`${URI}/user/register`, { username, password }, { withCredentials: true });
            const userData = response.data.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/home');
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    // Login
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${URI}/user/login`, { username, password }, { withCredentials: true });
            if (response.data.success) {
                const userData = response.data.data;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/home');
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    // Logout
    const logoutUser = async () => {
        try {
            await axios.get(`${URI}/user/logout`, { withCredentials: true });
            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        const verifySession = async () => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    const response = await axios.get(`${URI}/user/verify`, { withCredentials: true });
                    if (response.data.isLoggedIn) {
                        setUser(JSON.parse(savedUser));
                    } else {
                        logoutUser();
                    }
                } catch (error) {
                    console.error("Session verification error:", error);
                }
            }
        };

        verifySession();
        const intervalId = setInterval(verifySession, 5 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
