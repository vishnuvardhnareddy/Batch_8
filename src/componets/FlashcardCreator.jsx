// src/components/FlashcardCreator.jsx

import React, { useState } from 'react';
import Flashcard from './Flashcard';

const FlashcardCreator = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');

    const handleAddFlashcard = () => {
        if (frontText && backText) {
            setFlashcards([...flashcards, { frontText, backText }]);
            setFrontText('');
            setBackText('');
        }
    };

    const handleDeleteFlashcard = (index) => {
        const updatedFlashcards = flashcards.filter((_, i) => i !== index);
        setFlashcards(updatedFlashcards);
    };

    return (
        <div className='w-75 m-auto'>
            <h1 id='heading'>Create Flashcards</h1>
            <input
                className='w-25  border border-dark bg-light text-dark m-2 rounded'
                id='input1'
                type="text"
                placeholder="Front Text"
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
            />
            <input
                className='w-25  border border-dark bg-light text-dark m-2 rounded'
                id='input2'
                type="text"
                placeholder="Back Text"
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
            />
            <button id='btn' className='border border-success bg-success text-white rounded ' onClick={handleAddFlashcard}>Add Flashcard</button>


            <div className="flashcard-list bg">
                {flashcards.map((flashcard, index) => (
                    <Flashcard
                        key={index}
                        frontText={flashcard.frontText}
                        backText={flashcard.backText}
                        onDelete={() => handleDeleteFlashcard(index)}
                    />
                ))}
            </div>
            
        </div>
    );
};

export default FlashcardCreator;
