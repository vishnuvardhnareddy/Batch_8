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
        <div className="flex items-center justify-center min-h-screen bg-gray-800"> {/* Changed background color */}
            <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-lg w-80">
                <h1 className="text-2xl font-semibold mb-4 text-center text-yellow-600">Login</h1>
                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-yellow-400 p-2 mb-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-yellow-400 p-2 mb-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    type="submit"
                    className="bg-yellow-500 text-white py-2 rounded-xl w-full hover:bg-yellow-600 transition duration-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
