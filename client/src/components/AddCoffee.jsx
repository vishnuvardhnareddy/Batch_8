import React, { useState } from 'react';
import axios from 'axios';
import { FaCoffee, FaUpload } from 'react-icons/fa';

const AddCoffee = () => {
    // State to hold form data
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // New state for message type (success/error)

    const URI = import.meta.env.VITE_API_URL; // API URI from environment variable

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !price || !description || !image) {
            setMessage('All fields are required, including the image.');
            setMessageType('error'); // Set message type to error
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);

        try {
            // Use axios to make the request
            const response = await axios.post(
                `${URI}/coffee`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // If the user is authenticated
                        'Content-Type': 'multipart/form-data', // Important to specify for file uploads
                    },
                    withCredentials: true, // Allow cookies or credentials to be sent along with the request
                }
            );

            if (response.status === 201) {
                setMessage('Coffee added successfully!');
                setMessageType('success'); // Set message type to success
                setTitle('');
                setPrice('');
                setDescription('');
                setImage(null); // Reset the form after successful submission
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error occurred while adding coffee.');
            setMessageType('error'); // Set message type to error
        } finally {
            setLoading(false);
        }
    };

    // Handle image file change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Determine the message color based on the type
    const getMessageClass = () => {
        if (messageType === 'success') {
            return 'text-green-600'; // Green for success
        }
        return 'text-red-600'; // Red for error
    };

    return (
        <div className="max-w-lg mx-auto p-6 mt-14 rounded-lg shadow-lg border border-[#8c5e3c] bg-[#a47551]">
            <h2 className="text-3xl font-bold text-center text-[#f0e5d8] mb-4 flex items-center justify-center">
                <FaCoffee className="mr-2" /> Add a New Coffee
            </h2>

            {/* Display message */}
            {message && (
                <div className={`mb-4 text-center ${getMessageClass()}`}>
                    <p>{message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Coffee Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-[#f0e5d8]">
                        Coffee Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full p-2 border border-[#8c5e3c] rounded-md bg-[#d6b48d] text-[#4b2e0d] focus:outline-none focus:ring-2 focus:ring-[#b8946f]"
                        placeholder="Enter coffee title"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-[#f0e5d8]">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full p-2 border border-[#8c5e3c] rounded-md bg-[#d6b48d] text-[#4b2e0d] focus:outline-none focus:ring-2 focus:ring-[#b8946f]"
                        placeholder="Enter coffee price"
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-[#f0e5d8]">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full p-2 border border-[#8c5e3c] rounded-md bg-[#d6b48d] text-[#4b2e0d] focus:outline-none focus:ring-2 focus:ring-[#b8946f]"
                        placeholder="Enter a description"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-[#f0e5d8] flex items-center">
                        <FaUpload className="mr-2" /> Coffee Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="mt-1 block w-full p-2 border border-[#8c5e3c] rounded-md bg-[#d6b48d] text-[#4b2e0d] focus:outline-none focus:ring-2 focus:ring-[#b8946f]"
                        accept="image/*"
                    />
                </div>

                {/* Submit Button */}
                <div className="mb-4 text-center">
                    <button
                        type="submit"
                        className={`w-full p-2 bg-[#d6b48d] text-[#4b2e0d] rounded-md focus:outline-none hover:bg-[#b8946f] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Coffee'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCoffee;
