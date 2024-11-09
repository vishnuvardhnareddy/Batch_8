import { useUser } from '../context/UserContext'; // Adjust the path as needed
import { FaSmile, FaFileAlt, FaStickyNote, FaBook } from 'react-icons/fa';

const Home = () => {
    const { user } = useUser();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 text-gray-800">
            {/* Welcome Card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-10 max-w-md text-center mb-8">
                <FaSmile className="text-5xl text-yellow-500 mb-5" />
                <h1 className="text-3xl font-semibold text-yellow-600">
                    Welcome, {user?.username || 'Guest'}!
                </h1>
                <p className="text-lg text-yellow-700 mt-3">
                    This is the home page of FSN - a platform designed to support students with Flashcards, Storage, and Notes.
                </p>
            </div>

            {/* Features Section */}
            <div className="grid gap-6 max-w-4xl grid-cols-1 md:grid-cols-3 px-4">
                {/* Flashcards Feature */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 text-center">
                    <FaBook className="text-4xl text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-yellow-600">Flashcards</h2>
                    <p className="text-yellow-700 mt-2">
                        Easily create and review flashcards to help reinforce your learning. Perfect for quick revisions!
                    </p>
                </div>

                {/* Storage Feature */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 text-center">
                    <FaFileAlt className="text-4xl text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-yellow-600">Storage</h2>
                    <p className="text-yellow-700 mt-2">
                        Store all your educational files like PDFs, PPTs, and documents in one place for easy access.
                    </p>
                </div>

                {/* Notes Feature */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 text-center">
                    <FaStickyNote className="text-4xl text-yellow-500 mb-4" />
                    <h2 className="text-2xl font-semibold text-yellow-600">Notes</h2>
                    <p className="text-yellow-700 mt-2">
                        Organize and manage your notes efficiently. Keep track of important ideas and summaries.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
