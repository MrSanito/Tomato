import express from "express"
import { Router } from "express"
 import authRoutes from "./auth.routes.js"
let router = Router()
router.use("/auth", authRoutes)
export default router