import express from "express";
import { isAuth, isSeller } from "../middlewares/isAuth.js";
import { addRestaurant, fetchMyRestaurant } from "../controllers/restaurant.js";

const router = express.Router();
router.post("/restaurant/new", isAuth, isSeller, addRestaurant)
router.get("/restaurant/myRestaurant", isAuth, isSeller, fetchMyRestaurant)
export default router;
