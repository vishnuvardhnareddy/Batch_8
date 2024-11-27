import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Home = () => {
    const userName = "saketh"; // Replace with dynamic user data if needed

    return (
        <div className="bg-[#a47551] h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#FFF8DC] mb-6 text-center">
                Welcome, {userName}!
            </h1>
            <p className="text-lg md:text-xl text-[#FFF8DC] mb-6 text-center">
                Dive into our caramel-inspired experience. Explore and enjoy our features.
            </p>
        </div>
    );
};

export default Home;