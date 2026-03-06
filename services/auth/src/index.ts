import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import {Request, Response} from "express"


dotenv.config()

const app = express()
app.use(express.json())

const PORT= process.env.PORT;
const apple = "apple"

app.get("/", async (req: Request, res: Response) => {
    res.status(200).json({
        success: true, 
        message: "here we are success message"
    })
    
})
app.use("/api/v1", router)

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("Mongo connected");
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error("DB connection failed:", err);
  }
});