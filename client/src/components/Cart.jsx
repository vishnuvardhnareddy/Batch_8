import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCoffee, FaShoppingCart, FaTruck, FaTrash } from "react-icons/fa";

const Cart = () => {
    const URI = import.meta.env.VITE_API_URL;
    const [cart, setCart] = useState(null); // Initializing with null to represent loading or empty state
    const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
    const [orderDetails, setOrderDetails] = useState({ name: "", address: "", phone: "" }); // State to store address and payment details

    const fetchCart = async () => {
        try {
            const res = await axios.get(`${URI}/cart`, { withCredentials: true });
            setCart(res.data.data || []); // Make sure to set an empty array if items are not found
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCart([]); // Set an empty array on error
        }
    };

    const deleteItem = async (itemId) => {
        try {
            const res = await axios.delete(`${URI}/cart/${itemId}`, { withCredentials: true });
            if (res.status === 200) {
                // Remove the deleted item from the cart state
                setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
                alert("Item deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete item");
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails({
            ...orderDetails,
            [name]: value,
        });
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(
            `${URI}/cart/order`,
            { cart, orderDetails },
            { withCredentials: true }
        );
        alert(res.data.message);
        setCart(null);
        setShowForm(false); // Close the form after successful submission
    };

    if (cart === null) {
        return (
            <h1 className="text-xl text-center mt-6 text-brown-600">
                <FaCoffee className="inline-block mr-2" /> Your cart is empty
            </h1>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 bg-brown-100 mt-14">
            <h1 className="text-3xl font-bold mb-6 text-center text-brown-700">
                <FaShoppingCart className="inline-block mr-2" /> Your Coffee Cart
            </h1>
            {/* Cart Items List */}
            <div className="space-y-4">
                {cart.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm bg-brown-50"
                    >
                        <img
                            src={item.coffee.image}
                            alt={item.coffee.title}
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1 ml-4">
                            <h2 className="text-lg font-semibold text-brown-700">
                                {item.coffee.title}
                            </h2>
                            <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-lg font-semibold text-brown-700">
                            ₹{item.quantity * item.price}
                        </div>
                        <button
                            onClick={() => deleteItem(item._id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            <FaTrash className="inline-block" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Buy Now Button */}
            <div className="text-center mt-6">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-brown-600 text-white px-4 py-2 rounded-md hover:bg-brown-700"
                >
                    Buy Now <FaTruck className="inline-block ml-2" />
                </button>
            </div>

            {/* Address and Payment Form */}
            {showForm && (
                <div className="mt-8 p-4 border border-gray-300 rounded-lg shadow-md bg-brown-50">
                    <h2 className="text-2xl font-semibold text-center mb-4 text-brown-700">
                        Enter Address Details
                    </h2>
                    <form onSubmit={handleOrderSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-brown-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={orderDetails.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brown-700">
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={orderDetails.address}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-brown-700">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={orderDetails.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-brown-700">
                                    Payment Method
                                </label>
                                <select
                                    disabled
                                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-200"
                                >
                                    <option value="cash">Cash on Delivery</option>
                                </select>
                            </div>

                            <div className="text-center mt-4">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Cart;
