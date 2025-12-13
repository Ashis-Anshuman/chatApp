import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt_token;
        if(!token){return res.status(401).json({message:"Unauthorized no token"})};

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!verifyToken){return res.status(401).json({message: "Unauthorized invalid token"})};

        const user = await User.findById(verifyToken.userId).select("-password");
        if(!user){return res.status(401).json({message: "Unauthorized User not found"})};
        
        req.user = user;
        next();
    } catch (error) {
        console.error("don't able to authorize token".error);
        res.status(501).json({message: "Server doesn't support the request method"});
    }

}