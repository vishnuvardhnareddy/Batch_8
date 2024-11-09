import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import "./FlashCard.css"; // Import the CSS file for styling

const FlashCard = ({ card, onDelete, onEdit }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // Toggle flip state
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flip-card" onClick={handleFlip}>
            <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                {/* Front side with title */}
                <div className="flip-card-front bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 shadow-md rounded-md p-4">
                    <h3 className="text-xl font-semibold text-yellow-700">{card.title}</h3>
                </div>
                {/* Back side with description and actions */}
                <div className="flip-card-back bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 shadow-md rounded-md p-4">
                    <p className="text-gray-700">{card.description}</p>
                    <p className="text-sm text-gray-400 mt-4">Created on: {new Date(card.createdAt).toLocaleDateString()}</p>
                    <div className="flex mt-4">
                        <button
                            onClick={(e) => { e.stopPropagation(); onEdit(card); }}
                            className="text-blue-500 hover:text-blue-700 mr-4"
                        >
                            <FaEdit /> Edit
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(card._id); }}
                            className="text-red-500 hover:text-red-700"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlashCard;
