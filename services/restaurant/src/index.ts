import express, { NextFunction } from "express";
import { Request, Response } from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/index.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.use((req:Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);

  next();
});

const PORT = process.env.PORT;
app.use("/api/v1", restaurantRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Mongo connected");
    console.log(`Restaurant Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});
