import { createContext, useState, useContext } from 'react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

const UserContext = createContext();

export const UserProvider = ({ children, navigate }) => {
    const [user, setUser] = useState(null);

    const URI = import.meta.env.VITE_API_URL;

    // Register and login
    const registerUser = async (username, password) => {
        try {
            const response = await axios.post(`${URI}/user/register`, { username, password }, { withCredentials: true });
            setUser(response.data.data);
            navigate('/home'); // Redirect to home on success
        } catch (error) {

        }
    };

    // Login
    // In UserContext
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${URI}/user/login`, { username, password }, { withCredentials: true });

            if (response.data.success) {
                setUser(response.data.data); // Set the user data

                // Log the user data
                navigate('/home'); // Redirect to home on success
            } else {

            }
        } catch (error) {

        }
    };


    // Logout
    const logoutUser = async () => {
        try {
            await axios.get(`${URI}/user/logout`, { withCredentials: true });

            setUser(null); // Clear the user data
            navigate('/login'); // Redirect to login on success
        } catch (error) {

        }
    };


    return (
        <UserContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
