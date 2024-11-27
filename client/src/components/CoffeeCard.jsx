import React, { useState } from "react";
import axios from "axios";

const CoffeeCard = ({ id, title, image, price, description }) => {
    const [quantity, setQuantity] = useState(0);
    const URI = import.meta.env.VITE_API_URL;

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const addToCart = async () => {
        try {
            price *= quantity;
            const data = await axios.post(`${URI}/cart`, {
                coffee: id,
                quantity,
                price,
            }, {
                withCredentials: true,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-sm mx-auto bg-amber-50 border border-amber-200 rounded-lg shadow-md overflow-hidden mt-14">
            <img
                className="w-full h-48 object-cover"
                src={image}
                alt={title}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-amber-900">{title}</h3>
                <p className="mt-2 text-sm text-amber-700">{description}</p>
                <p className="mt-4 text-lg font-bold text-amber-800">₹{price}</p>

                <div className="mt-4 flex items-center">
                    <button
                        onClick={decreaseQuantity}
                        className="px-3 py-1 bg-amber-200 text-amber-900 rounded-md hover:bg-amber-300"
                    >
                        -
                    </button>
                    <span className="mx-4 text-lg font-semibold text-amber-900">{quantity}</span>
                    <button
                        onClick={increaseQuantity}
                        className="px-3 py-1 bg-amber-200 text-amber-900 rounded-md hover:bg-amber-300"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={addToCart}
                    className="mt-4 w-full bg-amber-600 text-white py-2 rounded-md hover:bg-amber-700"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default CoffeeCard;
