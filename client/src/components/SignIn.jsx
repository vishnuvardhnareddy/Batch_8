import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaUserPlus } from 'react-icons/fa'; // Importing the user plus icon

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
        <div className="flex items-center justify-center min-h-screen bg-[#a47551]">
            <form onSubmit={handleSignIn} className="bg-[#FFF8DC] p-6 rounded shadow-md w-80">
                <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center text-[#7b3f00]">
                    <FaUserPlus className="mr-2" /> Register & Log In
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-[#7b3f00] p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#7b3f00]"
                />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter Password"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    className="border border-[#7b3f00] p-2 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#7b3f00]"
                />
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        className="mr-2"
                    />
                    <label htmlFor="showPassword" className="text-sm text-[#7b3f00]">Show Password</label>
                </div>
                <button
                    type="submit"
                    className="bg-[#7b3f00] text-white py-2 rounded w-full hover:bg-[#5a2f00] transition"
                >
                    Register & Log In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
