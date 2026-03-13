import express from "express";
import cloudinary from "cloudinary";
import { Request, Response } from "express";

const router = express.Router();

router.post("/upload", async (req: Request, res: Response) => {
  try {
    const { buffer } = req.body;
    const cloud = await cloudinary.v2.uploader.upload(buffer);

    res.json({
      success: true,
      url: cloud.secure_url,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
