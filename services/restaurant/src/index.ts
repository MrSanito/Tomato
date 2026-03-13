import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/index.js"

dotenv.config();

const app = express();

const PORT = process.env.PORT;
app.use("/api/v1", r  estaurantRoutes)

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Mongo connected");
    console.log(`Restaurant Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});
