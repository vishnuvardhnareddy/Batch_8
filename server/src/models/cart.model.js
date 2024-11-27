// models/cart.model.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    coffee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coffee',
        required: true
    }, // Reference to the Coffee model
    quantity: {
        type: Number,
        required: true,
        min: 1
    }, // Quantity of the coffee in the cart
    price: {
        type: Number,
        required: true
    } // Price of the coffee at the time it was added to the cart
}, {
    _id: false // Disable _id for subdocuments to avoid redundancy
});

const cartSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, // Reference to the User model who owns the cart
    items: {
        type: [cartItemSchema],
        required: true,
        default: []
    } // Array of coffee items in the cart
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
