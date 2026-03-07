import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import { Request, Response } from "express";
import cors from "cors";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
 
app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "here we are success message",
  });
});
app.use("/api/v1", router);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Mongo connected");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});
