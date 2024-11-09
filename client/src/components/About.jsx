import { FaInfoCircle, FaUsers, FaLightbulb, FaBookOpen } from 'react-icons/fa';

const About = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 text-gray-800">
        {/* Page Title */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-8 max-w-2xl text-center mb-10">
            <FaInfoCircle className="text-5xl text-yellow-500 mb-4" />
            <h1 className="text-4xl font-semibold text-yellow-600 mb-2">About FSN</h1>
            <p className="text-lg text-yellow-700">
                FSN is a platform designed to enhance learning by providing tools for flashcards, document storage, and note-taking. It's a hub for students to organize and access their study materials efficiently.
            </p>
        </div>

        {/* Features Section */}
        <div className="grid gap-6 max-w-4xl grid-cols-1 md:grid-cols-3 px-4">
            {/* Feature 1: Flashcards */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 text-center">
                <FaBookOpen className="text-4xl text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-yellow-600">Flashcards</h2>
                <p className="text-yellow-700 mt-2">
                    Create and study flashcards to improve memory and retention. Perfect for preparing for exams and quick reviews.
                </p>
            </div>

            {/* Feature 2: Storage */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 text-center">
                <FaUsers className="text-4xl text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-yellow-600">Storage</h2>
                <p className="text-yellow-700 mt-2">
                    Securely store your important study documents like PDFs, PPTs, and notes, making them accessible anytime, anywhere.
                </p>
            </div>

            {/* Feature 3: Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-6 text-center">
                <FaLightbulb className="text-4xl text-yellow-500 mb-4" />
                <h2 className="text-2xl font-semibold text-yellow-600">Notes</h2>
                <p className="text-yellow-700 mt-2">
                    Capture your thoughts and organize ideas. Our notes feature helps you keep all your important information in one place.
                </p>
            </div>
        </div>

        {/* Additional Information Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-md p-8 max-w-2xl mt-10 text-center">
            <h2 className="text-3xl font-semibold text-yellow-600 mb-4">Why Choose FSN?</h2>
            <p className="text-yellow-700 text-lg">
                FSN is designed to simplify your study process. With features to organize, store, and quickly access materials, you can focus on learning without distractions. Join a community of learners and make studying more efficient and enjoyable!
            </p>
        </div>
    </div>
);

export default About;
