// src/components/Flashcard.jsx

import React, { useState } from 'react';
import './Flashcard.css'; // Import the CSS file for styles

const Flashcard = ({ frontText, backText, onDelete }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flashcard-container " onClick={handleFlip}>
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
                <div className="flashcard-front">
                    <h2>{frontText}</h2>
                </div>
                <div className="flashcard-back">
                    <h2>{backText}</h2>
                </div>
            </div>
            <button className="delete-button w-20" onClick={onDelete}>Delete</button>
        </div>
    );
};

export default Flashcard;
