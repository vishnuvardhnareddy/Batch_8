import { addTocart, getItems, orders, getOrders } from "../controllers/cart.controller.js";
import { Router } from "express";
import { isLoggedIn } from "../controllers/user.controller.js";

const router = Router();

router.post("/", isLoggedIn, addTocart);

router.post("/order", isLoggedIn, orders);

router.get("/order", isLoggedIn, getOrders);

router.get("/", isLoggedIn, getItems)



export default router;
