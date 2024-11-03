import { useState } from 'react';
import { useUser } from '../context/UserContext';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { registerUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!username || !password || !reEnterPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        if (password !== reEnterPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        setErrorMessage(''); // Clear previous error message
        await registerUser(username, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSignIn} className="bg-white p-6 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="mr-2"
                    />
                    <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 rounded w-full hover:bg-blue-600 transition"
                >
                    Register & Log In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
