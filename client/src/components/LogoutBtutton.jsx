// src/components/LogoutButton.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    return (
        <button
            onClick={logout}
            className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-md hover:bg-yellow-600 transition-all duration-200"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
