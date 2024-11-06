// src/components/Notes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { FaPlus} from 'react-icons/fa';
import FlashCard from './FlashCard';

// FlashCard component to display each flashcard and handle update/delete actions


// FlashCards component to handle flashcard operations
const FlashCards = () => {
    const { user } = useUser();
    const [cards, setCards] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editingCard, setEditingCard] = useState(null); // Track card being edited
    const URI = import.meta.env.VITE_API_URL;

    // Fetch flashcards from the server
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`${URI}/flashcards`, {
                    withCredentials: true,
                });
                setCards(response.data.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        if (user) {
            fetchCards();
        }
    }, [user]);

    // Handle adding or updating a flashcard
    const handleAddOrUpdateCard = async (e) => {
        e.preventDefault();
        try {
            if (editingCard) {
                // Update existing card
                const response = await axios.put(
                    `${URI}/flashcards/${editingCard._id}`,
                    { title, description },
                    { withCredentials: true }
                );
                setCards(cards.map(card => card._id === editingCard._id ? response.data.data : card));
                setEditingCard(null);
            } else {
                // Add new card
                const response = await axios.post(
                    `${URI}/flashcards`,
                    { title, description },
                    { withCredentials: true }
                );
                setCards([...cards, response.data.data]);
            }
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding/updating flashcard:', error);
        }
    };

    // Set a card for editing
    const handleEdit = (card) => {
        setEditingCard(card);
        setTitle(card.title);
        setDescription(card.description);
    };

    // Delete a flashcard
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URI}/flashcards/${id}`, {
                withCredentials: true,
            });
            setCards(cards.filter(card => card._id !== id));
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Flashcards</h2>
            <form onSubmit={handleAddOrUpdateCard} className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
                <div className="flex items-center mb-3">
                    <FaPlus className="text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold">{editingCard ? 'Edit Flashcard' : 'Add New Flashcard'}</h3>
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 mb-3 border border-gray-300 rounded-md"
                    rows="3"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
                >
                    {editingCard ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </form>

            {cards.map((card) => (
                <FlashCard key={card._id} card={card} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
        </div>
    );
};

export default FlashCards;
