import FlashCard from '../models/flashcard.model.js'; // Import the FlashCard model
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

// Middleware to check if the flashcard belongs to the logged-in user
const checkFlashCardOwnership = async (req, res, next) => {
    try {
        const flashcard = await FlashCard.findById(req.params.id);
        if (!flashcard) {
            return next(new ApiError(404, 'Flashcard not found.'));
        }
        if (flashcard.userId.toString() !== req.user._id.toString()) {
            return next(new ApiError(403, 'You do not have permission to modify this flashcard.'));
        }
        next();
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while checking flashcard ownership.', [error.message]));
    }
};

// Create a new flashcard
const createFlashCard = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const flashcard = new FlashCard({
            title,
            description,
            userId: req.user._id // Associate the flashcard with the logged-in user
        });

        const savedFlashCard = await flashcard.save();
        res.status(201).json(new ApiResponse(201, savedFlashCard, 'Flashcard created successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while creating the flashcard.', [error.message]));
    }
};

// Get all flashcards for the logged-in user
const getFlashCards = async (req, res, next) => {
    try {
        const flashcards = await FlashCard.find({ userId: req.user._id });
        res.status(200).json(new ApiResponse(200, flashcards, 'Flashcards retrieved successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving flashcards.', [error.message]));
    }
};

// Update a flashcard by ID
const updateFlashCard = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const updatedFlashCard = await FlashCard.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true } // Return the updated document
        );

        if (!updatedFlashCard) {
            return next(new ApiError(404, 'Flashcard not found.'));
        }

        res.status(200).json(new ApiResponse(200, updatedFlashCard, 'Flashcard updated successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while updating the flashcard.', [error.message]));
    }
};

// Delete a flashcard by ID
const deleteFlashCard = async (req, res, next) => {
    try {
        const deletedFlashCard = await FlashCard.findByIdAndDelete(req.params.id);

        if (!deletedFlashCard) {
            return next(new ApiError(404, 'Flashcard not found.'));
        }

        res.status(200).json(new ApiResponse(200, null, 'Flashcard deleted successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting the flashcard.', [error.message]));
    }
};

export {
    createFlashCard,
    getFlashCards,
    updateFlashCard,
    deleteFlashCard,
    checkFlashCardOwnership
};
