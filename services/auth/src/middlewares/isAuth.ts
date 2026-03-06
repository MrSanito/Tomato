import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import User, { Iuser } from "../model/User.model.js";
import TryCatch from "./tryCatch.js";

export interface AuthenticatedRequest extends Request {
  user?: Iuser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({
        success: false,
        message: "please Login - No Auth Header",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: "please Login - Token Missing",
      });
      return;
    }

    const decodedValue = jwt.verify(
      token,
      process.env.JWT_SEC as string,
    ) as JwtPayload;

    if (!decodedValue || !decodedValue.user) {
      res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
      return;
    }

    req.user = decodedValue.user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Login  = Jwt Error",
    });
  }
};

const allowedRoles = ["customer", "rider", "seller"] as const;

type Role = (typeof allowedRoles)[number];
export const addUserRole = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (!req.user?._id) {
    res.status(401).json({
      success: false,
      message: "Unauthorized ",
    });
  }
  const { role } = req.body as { role: Role };

  if (!allowedRoles.includes(role)) {
    res.status(400).json({
      success: false,
      message: "Invalid Role",
    });
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { role },
    { new: true },
  );

  if (!user) {
    res.status(404).json({
      success: false,
      message: "user not found ",
    });
  }
  const token = jwt.sign({ user }, process.env.JWT_SEC as string, {
    expiresIn: "15d",
  });

  res.json({user, token})
});
