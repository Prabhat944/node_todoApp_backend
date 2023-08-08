import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";

export const isAuthenticated = async(req,res,next) => {
     const {token} = req.cookies;
     if(!token) return res.status(403).json({
        success:false,
        message:"Login first"
    })

     const decoded = jwt.verify(token,process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if(!user) return res.status(403).json({
        success:false,
        message:"Unauthorized Access user"
    })
    req.user = user;
    next();
}