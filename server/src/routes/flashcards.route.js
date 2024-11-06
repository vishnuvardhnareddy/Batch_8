// routes/flashcards.routes.js
import express from 'express';
import {
    createFlashCard,
    getFlashCards,
    updateFlashCard,
    deleteFlashCard,
    checkFlashCardOwnership
} from '../controllers/falshcard.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Protect all routes with isLoggedIn middleware
router.use(isLoggedIn);

// Create a new flashcard
router.post('/', asyncHandler(createFlashCard));

// Get all flashcards for the logged-in user
router.get('/', asyncHandler(getFlashCards));

// Update a flashcard by ID
router.put('/:id', checkFlashCardOwnership, asyncHandler(updateFlashCard));

// Delete a flashcard by ID
router.delete('/:id', checkFlashCardOwnership, asyncHandler(deleteFlashCard));

export default router;
