import express from 'express';
import { upload } from '../middlewares/multer.js'; // Import multer setup
import {
    uploadFile,
    getFiles,
    deleteFile,
    checkFileOwnership
} from '../controllers/file.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';

import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Upload file route
router.post('/upload', isLoggedIn, upload.single('file'), asyncHandler(uploadFile)); // Use multer middleware for file uploads

// Get all files route
router.get('/', isLoggedIn, asyncHandler(getFiles));

// Delete file route (only accessible if logged in and file ownership is validated)
router.delete('/:id', isLoggedIn, checkFileOwnership, asyncHandler(deleteFile));

export default router;
