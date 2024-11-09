import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { user, logoutUser } = useUser();

    return (
        <nav className="bg-yellow-100 text-yellow-800 flex justify-between items-center p-4 shadow-md">
            {/* Left Side: Brand/Logo or Components */}
            <div className="flex items-center space-x-6">
                <Link to="/home" className="text-xl font-bold text-yellow-700 hover:text-yellow-500 transition duration-200">Home</Link>
                <Link to="/about" className="text-yellow-700 hover:text-yellow-500 transition duration-200">About</Link>
                <Link to="/notes" className="text-yellow-700 hover:text-yellow-500 transition duration-200">Notes</Link>
                <Link to="/flashcards" className="text-yellow-700 hover:text-yellow-500 transition duration-200">Flashcards</Link>
                <Link to="/files" className="text-yellow-700 hover:text-yellow-500 transition duration-200">Files</Link>
            </div>

            {/* Right Side: User Actions */}
            <div className="flex items-center space-x-6">
                {user ? (
                    <button
                        onClick={logoutUser}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="text-yellow-700 hover:text-yellow-500 transition duration-200">Login</Link>
                        <Link to="/signin" className="text-yellow-700 hover:text-yellow-500 transition duration-200">Sign In</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
