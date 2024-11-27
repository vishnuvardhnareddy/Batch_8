// routes/coffee.routes.js
import express from 'express';
import { upload } from "../middlewares/multer.js";  // Import multer configuration
import { getAllCoffees, addCoffee, deleteCoffee } from '../controllers/coffee.controller.js';
import { isLoggedIn } from '../controllers/user.controller.js';  // Assuming user authentication middleware

const router = express.Router();

// Get all coffees available
router.get('/', isLoggedIn, getAllCoffees);

// Add a new coffee (image upload + logged-in users only)
router.post('/', isLoggedIn, upload.single('image'), addCoffee);

// Delete a coffee (logged-in users only)
router.delete('/:id', isLoggedIn, deleteCoffee);

export default router;
