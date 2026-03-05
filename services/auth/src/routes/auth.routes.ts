
import express from "express"
import { Router } from "express"
import { loginUser } from "../controllers/auth.controller.js";

const router = Router()
router.get("/login", loginUser)

export default router;