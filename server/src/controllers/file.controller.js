import File from '../models/file.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// Upload file
const uploadFile = async (req, res, next) => {
    try {
        const filePath = req.file.path;
        const cloudinaryResponse = await uploadOnCloudinary(filePath);

        if (!cloudinaryResponse) {
            return next(new ApiError(500, 'Error uploading file to Cloudinary.'));
        }

        const newFile = new File({
            user: req.user._id,
            originalName: req.file.originalname,
            filePath: cloudinaryResponse.secure_url,
        });

        const savedFile = await newFile.save();
        res.status(201).json(new ApiResponse(201, savedFile, 'File uploaded successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while uploading the file.', [error.message]));
    }
};

// Get all files for a user
const getFiles = async (req, res, next) => {
    try {
        const files = await File.find({ user: req.user._id });
        res.status(200).json(new ApiResponse(200, files, 'Files retrieved successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while retrieving files.', [error.message]));
    }
};

// Download file by ID

import axios from 'axios';

const downloadFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return next(new ApiError(404, 'File not found.'));
        }

        // Fetch the file from Cloudinary
        const response = await axios.get(file.filePath, { responseType: 'stream' });

        // console.log(response);


        // Set appropriate headers for downloading
        res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
        res.setHeader('Content-Type', response.headers['content-type']);

        // Pipe the file data from Cloudinary to the response
        response.data.pipe(res);
    } catch (error) {
        console.error("Error downloading the file:", error);
        return next(new ApiError(500, 'An error occurred while downloading the file.', [error.message]));
    }
};



// Delete file by ID
const deleteFile = async (req, res, next) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return next(new ApiError(404, 'File not found.'));
        }

        // Delete file from Cloudinary
        const deletionResponse = await deleteFromCloudinary(file.filePath);
        if (!deletionResponse) {
            return next(new ApiError(500, 'Error deleting file from Cloudinary.'));
        }

        // Delete the file record from the database
        await File.findByIdAndDelete(req.params.id);
        res.status(200).json(new ApiResponse(200, null, 'File deleted successfully.'));
    } catch (error) {
        return next(new ApiError(500, 'An error occurred while deleting the file.', [error.message]));
    }
};

export { uploadFile, getFiles, deleteFile, downloadFile };
