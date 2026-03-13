import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import { Response } from "express";
import TryCatch from "../middlewares/tryCatch.js";
import Restaurant from "../models/Restaurant.js";
import getBuffer from "../config/datauri.js";
import axios from "axios";
import jwt from "jsonwebtoken"

export const addRestaurant = TryCatch(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }

    const exisitingRestaurant = await Restaurant.findOne({
      ownerId: user._id,
    });

    if (exisitingRestaurant) {
      return res.status(400).json({
        success: true,
        message: "You already Have Restaurant",
      });
    }

    const { name, description, latitude, longitude, formattedAddress, phone } =
      req.body;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "please give all details",
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: " Please give  image",
      });
    }
    const fileBuffer = getBuffer(file);

    if (!fileBuffer) {
      return res.status(500).json({
        success: false,
        message: " Failed to create file buffer",
      });
    }

    const { data: uploadResult } = await axios.post(
      `${process.env.UTILS_SERVICE}/api/v1/upload`,
      {buffer: fileBuffer.content, }
    );

    const restaurant = await Restaurant.create({
        name, description, 
        phone,  
        image: uploadResult.url, 
        ownerId: user._id, 
        autoLocation: {
            type: "Point", 
            coordinates: [Number(longitude), Number(latitude)],
            formattedAddress
        }

    })

    return res.status(201).json({
        success: true, 
        message: "REstaurant Created Successfully", 
        restaurant
    })
  },

);


export const fetchMyRestaurant = TryCatch(async (req:AuthenticatedRequest , res:Response) => {

    if(!req.user) {
        return res.status(401).json({
            success: false, 
            message: "Please Login"
        })
    }
    
    const restaurant = await Restaurant.findOne({ownerId: req.user._id})
    if(!restaurant) {
        return res.json({
            success: false , 
            message: "Invalid User"
        })

    }
        if(!req.user.restaurantId) {

const token = jwt.sign({
    user: {
        ...req.user, 
        restaurantId : restaurant._id
    }
}, process.env.JWT_SEC as string, {
    expiresIn: "15"
})
        }
})