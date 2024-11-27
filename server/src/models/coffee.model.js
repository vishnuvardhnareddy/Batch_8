// models/coffee.model.js
import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, // URL to the coffee image
    price: { type: Number, required: true }, // Price of the coffee
    description: { type: String, required: true }, // Description of the coffee
}, {
    timestamps: true, // Tracks createdAt and updatedAt fields automatically
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
