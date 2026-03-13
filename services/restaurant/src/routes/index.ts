import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.js";
import { addRestaurant } from "../controllers/restaurant.js";

const router = express.Router();
router.post("restaurant/new", isAuth, isSeller, addRestaurant)
export default router;
