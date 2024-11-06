// src/components/Notes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { FaPlus } from 'react-icons/fa';

const Note = ({ note }) => (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <h3 className="text-xl font-semibold">{note.title}</h3>
        <p className="text-gray-700 mt-2">{note.description}</p>
        <p className="text-sm text-gray-400 mt-4">Created on: {new Date(note.createdAt).toLocaleDateString()}</p>
    </div>
);

const Notes = () => {
    const { user } = useUser();
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const URI = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchNotes = async () => {
            try {

                const response = await axios.get(`${URI}/notes`, {
                    withCredentials: true,
                });
                setNotes(response.data.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        if (user) {
            fetchNotes();
        }
    }, [user]);

    const handleAddNote = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${URI}/notes`,
                { title, description },
                { withCredentials: true }
            );
            setNotes([...notes, response.data.data]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
            <form onSubmit={handleAddNote} className="mb-6 bg-gray-100 p-4 rounded-md shadow-md">
                <div className="flex items-center mb-3">
                    <FaPlus className="text-gray-500 mr-2" />
                    <h3 className="text-lg font-semibold">Add New Note</h3>
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
                    Add Note
                </button>
            </form>

            {notes.map((note) => (
                <Note key={note._id} note={note} />
            ))}
        </div>
    );
};

export default Notes;
