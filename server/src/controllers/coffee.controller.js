// controllers/coffee.controller.js
import Coffee from '../models/coffee.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';  // Import the Cloudinary upload function

// Get all available coffees
const getAllCoffees = async (req, res, next) => {
    try {
        const coffees = await Coffee.find();
        res.status(200).json(new ApiResponse(200, coffees, 'All coffees fetched successfully'));
    } catch (error) {
        return next(new ApiError(500, 'Error fetching coffees', [error.message]));
    }
};


// Add a new coffee item (with image upload)
const addCoffee = async (req, res, next) => {
    try {
        const { title, price, description } = req.body;

        if (!title || !price || !description || !req.file) {
            return next(new ApiError(400, 'All fields are required including the image.'));
        }

        // Upload the image to Cloudinary
        const imageUrl = await uploadOnCloudinary(req.file.path);
        if (!imageUrl) {
            return next(new ApiError(500, 'Error uploading image to Cloudinary.'));
        }

        // Create the coffee item in the database
        const newCoffee = new Coffee({
            title,
            price,
            description,
            image: imageUrl.secure_url  // Store the Cloudinary image URL in the DB
        });

        await newCoffee.save();

        res.status(201).json(new ApiResponse(201, newCoffee, 'Coffee added successfully'));
    } catch (error) {
        return next(new ApiError(500, 'Error adding coffee', [error.message]));
    }
};

// Delete a coffee item by ID (with image deletion from Cloudinary)
const deleteCoffee = async (req, res, next) => {
    try {
        const coffeeId = req.params.id;

        // Find the coffee by ID to get its image URL
        
        console.log("Deleting coffee with ID:", coffeeId);

        const coffee = await Coffee.findById(coffeeId);
        if (!coffee) {
            return next(new ApiError(404, 'Coffee not found.'));
        }

        
        console.log("Coffee found:", coffee);

        // If there's an image URL, delete the image from Cloudinary first
        if (coffee.image) {
            
            console.log("Deleting image from Cloudinary:", coffee.image);

            // Ensure the URL is a valid Cloudinary URL (optional)
            if (!coffee.image.includes('cloudinary.com')) {
                return next(new ApiError(400, 'Invalid Cloudinary image URL.'));
            }

            // Delete the image from Cloudinary
            const deleteResponse = await deleteFromCloudinary(coffee.image);

            // Check if image deletion was successful
            if (!deleteResponse) {
                
                console.error('Error deleting image from Cloudinary.');
                // Stop further processing and return an error if image deletion failed
                return next(new ApiError(500, 'Image deletion failed. Coffee not deleted.'));
            } else {
                
                console.log("Image deleted from Cloudinary:", deleteResponse);
            }
        }

        // Now delete the coffee record from the database
        await Coffee.findByIdAndDelete(coffeeId);

        res.status(200).json(new ApiResponse(200, null, 'Coffee deleted successfully'));
    } catch (error) {
        
        console.error("Error in deleteCoffee:", error);
        return next(new ApiError(500, 'Error deleting coffee', [error.message]));
    }
};



export { getAllCoffees, addCoffee, deleteCoffee };
