import Cart from "../models/cart.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Order from "../models/order.model.js";

// Add to Cart
const addTocart = asyncHandler(async (req, res, next) => {
    const { coffee, quantity, price } = req.body;
    const userId = req.user._id;

    if (!coffee || !quantity || !price) {
        return res.status(400).json(new ApiError("Coffee, quantity, and price are required", 400));
    }

    // Find the user's cart
    let cart = await Cart.findOne({ owner: userId });

    if (!cart) {
        // Create a new cart if none exists
        cart = new Cart({
            owner: userId,
            items: [{ coffee, quantity, price }],
        });

        await cart.save();
        return res.status(201).json(new ApiResponse("Cart created and item added", cart));
    }

    // If cart exists, check if the item already exists
    const existingItem = cart.items.find(item => item.coffee.toString() === coffee);

    if (existingItem) {
        // Update the existing item's quantity and price
        existingItem.quantity = quantity;
        existingItem.price = price; // Optional: Update price to the latest
    } else {
        // Add the new item to the cart
        cart.items.push({ coffee, quantity, price });
    }

    await cart.save();
    return res.status(200).json(new ApiResponse("Cart updated with the item", cart));
});

// Get Cart Items
const getItems = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming the user is authenticated and user data is attached to req.user

    // Attempt to find the user's cart and populate the 'coffee' field with details from the Coffee collection
    const cart = await Cart.findOne({ owner: userId }).populate('items.coffee'); // Populate 'coffee' field in items

    // If the cart doesn't exist, return a 404 error
    if (!cart) {
        return res.status(404).json(new ApiError(404, "Cart does not exist or is empty"));
    }

    // Map over the cart items to remove unnecessary information (like the coffee ObjectId)
    const items = cart.items.map(item => ({
        coffee: {
            id: item.coffee._id,  // coffee ID
            title: item.coffee.title,  // coffee title (or any other fields you want to include)
            image: item.coffee.image,  // coffee image (if you want to include)
        },
        quantity: item.quantity,
        price: item.price,
    }));

    // Return the cart items with a 200 status code if found
    return res.status(200).json(new ApiResponse(200, items, "Cart items fetched successfully"));
});

// Get Orders
const getOrders = asyncHandler(async (req, res) => {
    // Fetch all orders from the database, populating user and product details
    const orders = await Order.find()
        .populate('userId', 'name address phone') // Populate user details like name, address, phone
        .populate('products.productId', 'title image price'); // Populate product details like title, image, price

    // If no orders are found, send a 404 response
    if (!orders || orders.length === 0) {
        return res.status(404).json(new ApiResponse(404, [], "No orders found"));
    }

    // Return the orders in the response
    res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// Place Order
const orders = asyncHandler(async (req, res) => {
    // Extracting the cart and order details from the request body
    const { cart, orderDetails } = req.body;
    const userId = req.user._id; // Assuming req.user contains the authenticated user

    // Check if cart is empty or undefined
    if (!cart || cart.length === 0) {
        return res.status(400).json(new ApiError("Cart is empty", 400));
    }

    // Create an array to store product details from the cart
    const products = cart.map(item => ({
        productId: item.coffee.id,  // Unique product ID (assuming `coffee.id` is the product ID)
        title: item.coffee.title,   // Product name
        image: item.coffee.image,   // Product image URL
        quantity: item.quantity,    // Quantity of the product
        price: item.price           // Price of the product
    }));

    // Calculate the total amount for the order
    const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Create a new order object
    const newOrder = new Order({
        userId,                // The user placing the order
        userDetails: {         // User details from orderDetails
            name: orderDetails.name,
            address: orderDetails.address,
            phone: orderDetails.phone
        },
        products,             // Products in the order
        totalAmount,          // Total amount of the order
        createdAt: new Date() // Timestamp of when the order is created
    });

    // Save the new order to the database
    await newOrder.save();

    // Send a success response with the order ID and status
    res.status(201).json(new ApiResponse(201, { orderId: newOrder._id, status: newOrder.status }, "Order placed successfully"));
});

export { addTocart, getItems, orders, getOrders };
