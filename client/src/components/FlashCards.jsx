import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { FaPlus } from 'react-icons/fa';
import FlashCard from './FlashCard';

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
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-6">
            <div className="max-w-lg mx-auto bg-white bg-opacity-70 rounded-lg shadow-xl p-6">
                <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">Your Flashcards</h2>

                <form onSubmit={handleAddOrUpdateCard} className="mb-6 bg-yellow-50 p-4 rounded-md shadow-lg border border-yellow-200">
                    <div className="flex items-center mb-3">
                        <FaPlus className="text-yellow-500 mr-2" />
                        <h3 className="text-lg font-semibold text-yellow-600">
                            {editingCard ? 'Edit Flashcard' : 'Add New Flashcard'}
                        </h3>
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full p-2 mb-3 border border-yellow-300 rounded-md bg-yellow-50 text-yellow-800"
                        required
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full p-2 mb-3 border border-yellow-300 rounded-md bg-yellow-50 text-yellow-800"
                        rows="3"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition"
                    >
                        {editingCard ? 'Update Flashcard' : 'Add Flashcard'}
                    </button>
                </form>

                <div className="flashcard-container">
                    {cards.map((card) => (
                        <FlashCard key={card._id} card={card} onDelete={handleDelete} onEdit={handleEdit} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default FlashCards;
