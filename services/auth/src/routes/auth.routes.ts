
import express from "express"
import { Router } from "express"
import { loginUser } from "../controllers/auth.controller.js";
import { addUserRole, isAuth } from "../middlewares/isAuth.js";

const router = Router()
router.post("/login", loginUser)
router.post("/add/role", isAuth, addUserRole)

export default router;