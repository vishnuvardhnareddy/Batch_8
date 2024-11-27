import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: "dzjfzbzyt",
    api_key: 459794515323733,
    api_secret: "zQGxMOHYE3w0E9aNCS83jkek5u8"
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        console.log(process.env.CLOUDINARY_CLOUD_NAME);

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // File uploaded successfully, now delete local file
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {
        console.error("Cloudinary upload error: ", error.message);

        // Clean up the local file in case of an error
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        // Return a consistent error structure
        return null;
    }
};


const deleteFromCloudinary = async (url) => {
    try {
        // Ensure the URL contains 'upload/' to process further
        const uploadIndex = url.indexOf('/upload/');
        if (uploadIndex === -1) {
            throw new Error('Invalid Cloudinary URL');
        }

        // Extract the part after '/upload/'
        const filePath = url.substring(uploadIndex + 8); // Skip '/upload/'

        // Remove the version number (e.g., 'v1732627551/') if present
        const pathParts = filePath.split('/');
        if (pathParts[0].startsWith('v') && !isNaN(pathParts[0].substring(1))) {
            pathParts.shift(); // Remove the version number
        }

        // Join the remaining parts and remove the file extension
        const publicId = pathParts.join('/').split('.').slice(0, -1).join('.');

        // Delete the file from Cloudinary
        const response = await cloudinary.uploader.destroy(publicId);

        console.log('File deleted successfully:', response);
        return response;

    } catch (error) {
        console.error('Error deleting file:', error);
        return null;
    }
};




export { uploadOnCloudinary, deleteFromCloudinary };
