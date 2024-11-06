// controllers/notes.controller.js
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import Note from '../models/note.model.js';

// Middleware to ensure note ownership
const checkNoteOwnership = async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note || note.user.toString() !== req.user._id.toString()) {
            return next(new ApiError(403, 'You do not have permission to access this note.'));
        }
        next();
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while verifying note ownership.', [error.message]));
    }
};

// Create a new note
const createNote = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return next(new ApiError(400, 'Title and description are required.'));
        }

        const note = await Note.create({
            user: req.user._id,
            title,
            description,
        });

        res.status(201).json(new ApiResponse(201, note, 'Note created successfully'));
    } catch (error) {
        next(new ApiError(500, 'An error occurred while creating the note.', [error.message]));
    }
};

// Get all notes for the logged-in user
const getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.status(200).json(new ApiResponse(200, notes, 'Notes retrieved successfully'));
    } catch (error) {
        next(new ApiError(500, 'An error occurred while retrieving notes.', [error.message]));
    }
};

// Get a single note by ID
const getNoteById = async (req, res, next) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
        if (!note) {
            return next(new ApiError(404, 'Note not found.'));
        }
        res.status(200).json(new ApiResponse(200, note, 'Note retrieved successfully'));
    } catch (error) {
        next(new ApiError(500, 'An error occurred while retrieving the note.', [error.message]));
    }
};

// Update a note by ID
const updateNote = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { title, description, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedNote) {
            return next(new ApiError(404, 'Note not found or you do not have permission to update it.'));
        }

        res.status(200).json(new ApiResponse(200, updatedNote, 'Note updated successfully'));
    } catch (error) {
        next(new ApiError(500, 'An error occurred while updating the note.', [error.message]));
    }
};

// Delete a note by ID
const deleteNote = async (req, res, next) => {
    try {
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!deletedNote) {
            return next(new ApiError(404, 'Note not found or you do not have permission to delete it.'));
        }

        res.status(200).json(new ApiResponse(200, null, 'Note deleted successfully'));
    } catch (error) {
        next(new ApiError(500, 'An error occurred while deleting the note.', [error.message]));
    }
};

export { createNote, getNotes, getNoteById, updateNote, deleteNote, checkNoteOwnership };
