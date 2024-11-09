import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { FaPlus } from 'react-icons/fa';

const Note = ({ note }) => (
    <div className="bg-yellow-50 border border-yellow-200 shadow-md rounded-md p-4 mb-4">
        <h3 className="text-xl font-semibold text-yellow-600">{note.title}</h3>
        <p className="text-yellow-800 mt-2">{note.description}</p>
        <p className="text-sm text-yellow-500 mt-4">
            Created on: {new Date(note.createdAt).toLocaleDateString()}
        </p>
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
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 p-6">
            <div className="max-w-lg mx-auto bg-white bg-opacity-70 rounded-lg shadow-xl p-6">
                <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">Your Notes</h2>

                <form
                    onSubmit={handleAddNote}
                    className="mb-6 bg-yellow-50 p-4 rounded-md shadow-lg border border-yellow-200"
                >
                    <div className="flex items-center mb-3">
                        <FaPlus className="text-yellow-500 mr-2" />
                        <h3 className="text-lg font-semibold text-yellow-600">Add New Note</h3>
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
                        className="w-full bg-yellow-500 text-white font-semibold p-2 rounded-md hover:bg-yellow-600 transition"
                    >
                        Add Note
                    </button>
                </form>

                {notes.map((note) => (
                    <Note key={note._id} note={note} />
                ))}
            </div>
        </div>
    );
};

export default Notes;
