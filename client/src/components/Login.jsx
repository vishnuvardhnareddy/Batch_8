import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaSignInAlt } from 'react-icons/fa'; // Importing the sign-in icon

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!username || !password) {
            setErrorMessage('Both fields are required.');
            return;
        }

        setErrorMessage(''); // Clear previous error message
        await loginUser(username, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#a47551]">
            <form onSubmit={handleLogin} className="bg-[#FFF8DC] p-6 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center text-[#7b3f00]">
                    <FaSignInAlt className="mr-2" /> Login
                </h1>
                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-[#7b3f00] p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#7b3f00]"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-[#7b3f00] p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#7b3f00]"
                />
                <button
                    type="submit"
                    className="bg-[#7b3f00] text-white py-2 rounded w-full hover:bg-[#5a2f00] transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
