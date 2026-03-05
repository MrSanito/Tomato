
import {Request, Response}  from "express"
export const loginUser = async (req: Request, res: Response) => {
    res.status(200).json({
        succcess: "true", 
        message: true
    })
    
}