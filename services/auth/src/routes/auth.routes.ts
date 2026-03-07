
import express from "express"
import { Router } from "express"
import { loginUser, myProfile } from "../controllers/auth.controller.js";
import { addUserRole, isAuth } from "../middlewares/isAuth.js";

const router = Router()
router.post("/login", loginUser)
router.put("/add/role", isAuth, addUserRole)
router.get("/me", isAuth, myProfile)

export default router;