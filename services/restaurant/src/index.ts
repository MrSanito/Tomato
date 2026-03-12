import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv"

dotenv.config();



const app= express()

const PORT = process.env.PORT;


app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Mongo connected");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});
