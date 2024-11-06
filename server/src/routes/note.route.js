// routes/notes.routes.js
import express from 'express';
import {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote,
    checkNoteOwnership
} from '../controllers/notes.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Protect all routes with isLoggedIn middleware
router.use(isLoggedIn);

// Create a new note
router.post('/', asyncHandler(createNote));

// Get all notes for the logged-in user
router.get('/', asyncHandler(getNotes));

// Get a specific note by ID
router.get('/:id', asyncHandler(getNoteById));

// Update a note by ID
router.put('/:id', checkNoteOwnership, asyncHandler(updateNote));

// Delete a note by ID
router.delete('/:id', checkNoteOwnership, asyncHandler(deleteNote));

export default router;
