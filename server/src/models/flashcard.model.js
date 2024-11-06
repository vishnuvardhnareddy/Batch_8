import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
}, { timestamps: true });

const FlashCard = mongoose.model('FlashCard', flashcardSchema);

export default FlashCard;
