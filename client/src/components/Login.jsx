import { useState } from 'react';
import { useUser } from '../context/UserContext';

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600 transition"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
