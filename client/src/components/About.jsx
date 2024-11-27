import React from 'react';
import { useUser } from '../context/UserContext';

const About = () => {
    const { user } = useUser();

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-6 mt-12">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-3/4 md:w-1/2">
                <h1 className="text-3xl font-bold text-center text-[#8B4513] mb-4">About Us</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Welcome to our platform! We are dedicated to providing the best coffee experience, whether you are a casual coffee drinker or a connoisseur. Our mission is to connect you with high-quality coffee products, helpful resources, and a community of like-minded enthusiasts.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                    As a registered user, you gain access to exclusive features like personalized coffee recommendations, special offers, and the ability to manage your orders seamlessly.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    If you are not logged in, some sections and features may be restricted. Please log in to access the full range of services and benefits.
                </p>
                {user ? (
                    <p className="text-md text-green-600 font-semibold">
                        Hello, {user.username}! Thank you for being part of our community.
                    </p>
                ) : (
                    <p className="text-md text-red-600 font-semibold">
                        Please log in to enjoy all the features we have to offer.
                    </p>
                )}
            </div>
        </div>
    );
};

export default About;
