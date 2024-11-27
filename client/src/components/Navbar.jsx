import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { FaHome, FaInfoCircle, FaCoffee, FaShoppingCart, FaPlus, FaBox, FaSignInAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
    const { user, logoutUser } = useUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#8B4513] text-white fixed top-0 w-full z-50 shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4">
                {/* Left Side: Brand/Logo */}
                <div className="flex items-center justify-between w-full sm:w-auto">
                    <Link to="/home" className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-300">
                        <FaHome className="inline" />
                        <span>Home</span>
                    </Link>
                    <button
                        className="sm:hidden flex items-center justify-center p-2 border border-white rounded hover:bg-gray-700"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <FaBars className="text-white" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className={`sm:flex ${isMobileMenuOpen ? 'block' : 'hidden'} sm:space-x-4`}>
                    <Link to="/about" className="flex items-center space-x-1 hover:text-gray-300">
                        <FaInfoCircle className="inline" />
                        <span>About</span>
                    </Link>
                    <Link to="/coffees" className="flex items-center space-x-1 hover:text-gray-300">
                        <FaCoffee className="inline" />
                        <span>Coffees</span>
                    </Link>
                    <Link to="/cart" className="flex items-center space-x-1 hover:text-gray-300">
                        <FaShoppingCart className="inline" />
                        <span>Cart</span>
                    </Link>
                    <Link to="/addcoffee" className="flex items-center space-x-1 hover:text-gray-300">
                        <FaPlus className="inline" />
                        <span>Add Coffee</span>
                    </Link>
                    <Link to="/orders" className="flex items-center space-x-1 hover:text-gray-300">
                        <FaBox className="inline" />
                        <span>Orders</span>
                    </Link>
                </div>

                {/* Right Side: User Actions */}
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-sm">Welcome, {user.username}!</span>
                            <button
                                onClick={logoutUser}
                                className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300">
                                <FaSignInAlt />
                                <span>Login</span>
                            </Link>
                            <Link to="/signin" className="flex items-center space-x-1 hover:text-gray-300">
                                <FaSignInAlt />
                                <span>Sign In</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
