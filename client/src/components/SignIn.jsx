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
        <div className="flex items-center justify-center min-h-screen bg-gray-800"> {/* Changed background color */}
            <form onSubmit={handleSignIn} className="bg-white p-6 rounded-xl shadow-lg w-80">
                <h1 className="text-2xl font-semibold mb-4 text-center text-yellow-600">Sign Up & Log In</h1>
                {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-yellow-400 p-2 mb-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-yellow-400 p-2 mb-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    className="border border-yellow-400 p-2 mb-4 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                    className="bg-yellow-500 text-white py-2 rounded-xl w-full hover:bg-yellow-600 transition duration-200"
                >
                    Register & Log In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
