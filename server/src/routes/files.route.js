import express from 'express';
import { upload } from '../middlewares/multer.js';
import {
    uploadFile,
    getFiles,
    deleteFile,
    downloadFile,
} from '../controllers/file.controller.js';
import isLoggedIn from '../middlewares/isLoggedIn.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

// Upload file route
router.post('/upload', isLoggedIn, upload.single('file'), asyncHandler(uploadFile));

// Get all files route
router.get('/', isLoggedIn, asyncHandler(getFiles));

// Download file route
router.get('/download/:id', isLoggedIn, asyncHandler(downloadFile));

// Delete file route
router.delete('/:id', isLoggedIn, asyncHandler(deleteFile));

export default router;
