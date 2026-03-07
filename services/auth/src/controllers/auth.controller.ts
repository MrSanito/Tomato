import { Request, Response } from "express";
import User from "../model/User.model.js";
import jwt from "jsonwebtoken";
import TryCatch from "../middlewares/tryCatch.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { oauth2client } from "../config/googleConfig.js";
import axios from "axios";

export const loginUser = TryCatch(async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Authorization code is required",
    });
  }

  const googleRes = await oauth2client.getToken(code);

  oauth2client.setCredentials(googleRes.tokens);

  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
  );

  const { email, name, picture } = userRes.data;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name,
      email,
      image: picture,
      role: null,
    });
  }

  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "15d",
  });

  res.status(200).json({ message: "Logged Successfully", token, user });
});

export const myProfile = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;
    res.json(user);
  },
);
