// src/components/LogoutButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return (
        <button
            onClick={logout}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
