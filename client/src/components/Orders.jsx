import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
    const URI = import.meta.env.VITE_API_URL; // API URI from environment variable
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // To track loading state

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${URI}/cart/order`, { withCredentials: true });
            // Filter only orders with status "pending"
            const pendingOrders = res.data.data.filter(order => order.status === "pending");
            setOrders(pendingOrders); // Set only pending orders
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="container mx-auto p-6 bg-amber-50 mt-16">
            <h2 className="text-2xl font-semibold text-center mb-4 text-amber-900">Pending Orders</h2>

            {/* Loading State */}
            {loading && <p className="text-center text-amber-700">Loading...</p>}

            {/* If there are no pending orders */}
            {orders.length === 0 && !loading && (
                <p className="text-center text-red-500">No pending orders.</p>
            )}

            {/* Display the pending orders */}
            <div>
                {orders.map(order => (
                    <div
                        key={order._id}
                        className="border p-4 mb-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold text-amber-800">Order ID: {order._id}</h3>
                        <p className="text-gray-500">
                            Created At: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        {/* User Details */}
                        <div className="mt-2">
                            <h4 className="font-medium text-amber-800">User Details:</h4>
                            <p className="text-gray-700">Name: {order.userDetails.name}</p>
                            <p className="text-gray-700">Address: {order.userDetails.address}</p>
                            <p className="text-gray-700">Phone: {order.userDetails.phone}</p>
                        </div>

                        {/* Products */}
                        <div className="mt-4">
                            <h4 className="font-medium text-amber-800">Products:</h4>
                            {order.products.map(product => (
                                <div key={product._id} className="flex items-center border-t pt-2">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover mr-4 rounded-md border border-amber-200"
                                    />
                                    <div>
                                        <p className="text-amber-900 font-bold">{product.title}</p>
                                        <p className="text-gray-700">Price: ₹{product.price}</p>
                                        <p className="text-gray-700">Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="text-gray-700 mt-2">
                            Status:{" "}
                            <span className="text-yellow-600 font-semibold">{order.status}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
