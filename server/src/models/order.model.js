import mongoose from 'mongoose';

// Order schema for displaying user order details
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming User is another model storing user information
        required: true
    },
    userDetails: {
        name: { type: String, required: true }, // User's name
        address: { type: String, required: true },
        phone: { type: String, required: true }
    },
    products: [{
        productId: { type: String, required: true }, // Unique product ID
        title: { type: String, required: true }, // Product name
        image: { type: String, required: true }, // Product image URL
        quantity: { type: Number, required: true }, // Quantity of the product
        price: { type: Number, required: true } // Price for each product
    }],

    createdAt: { type: Date, default: Date.now }, // Order creation timestamp
});

// Create a model for orders
const Order = mongoose.model('Order', orderSchema);

export default Order;
