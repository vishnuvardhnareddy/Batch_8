import File from '../models/file.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js'; // Import Cloudinary utilities

// Middleware to check if the file belongs to the logged-in user
const checkFileOwnership = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return next(new ApiError(404, 'File not found.'));
        }
        if (file.user.toString() !== req.user._id.toString()) {
            return next(new ApiError(403, 'You do not have permission to modify this file.'));
        }
        next();
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while checking file ownership.', [error.message]));
    }
};

// Upload a file
const uploadFile = async (req, res, next) => {
    try {
        const filePath = req.file.path; // Local file path

        console.log(filePath);
        
        // Upload file to Cloudinary
        const cloudinaryResponse = await uploadOnCloudinary(filePath);
        if (!cloudinaryResponse) {
            return next(new ApiError(500, 'Error uploading file to Cloudinary.'));
        }

        // Create a new file record in the database
        const newFile = new File({
            user: req.user._id,
            originalName: req.file.originalname,
            filePath: cloudinaryResponse.secure_url // Store the secure URL from Cloudinary
        });

        const savedFile = await newFile.save();
        res.status(201).json(new ApiResponse(201, savedFile, 'File uploaded successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while uploading the file.', [error.message]));
    }
};

// Get all files for the logged-in user
const getFiles = async (req, res, next) => {
    try {
        const files = await File.find({ user: req.user._id });
        res.status(200).json(new ApiResponse(200, files, 'Files retrieved successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving files.', [error.message]));
    }
};

// Delete a file by ID
const deleteFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return next(new ApiError(404, 'File not found.'));
        }

        // Delete from Cloudinary
        const deletionResponse = await deleteFromCloudinary(file.filePath);
        if (!deletionResponse) {
            return next(new ApiError(500, 'Error deleting file from Cloudinary.'));
        }

        // Remove the file record from the database
        await File.findByIdAndDelete(req.params.id);
        res.status(200).json(new ApiResponse(200, null, 'File deleted successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting the file.', [error.message]));
    }
};

export {
    uploadFile,
    getFiles,
    deleteFile,
    checkFileOwnership
};
