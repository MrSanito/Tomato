import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

export interface Iuser {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  restaurantId: string;
}
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
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
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

export const isSeller = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {

  const user = req.user

  if(!user || user.role !== "seller") {
    res.status(401).json({
      success: false, 
      message: "you are not authorized seller"
    })
    return
  }

  next()
};
