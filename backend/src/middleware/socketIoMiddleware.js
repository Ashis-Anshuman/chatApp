import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const socketAuthProtect = async (socket, next)=>{
    try {

        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt_token="))
        ?.split("=")[1];

        if(!token){
            console.log("Socket.io connection rejected: No token provided");
            return(new Error("Unauthorized no token provided"));
        }
        
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!verifyToken){
            console.log("Socket.io connection rejected: Unauthorized Token");
            return(new Error("Connection Rejected Unauthorized Token"));
        }

        const user = await User.findById(verifyToken.userId).select("-password");
        if(!user){
            console.log("Socket.io connection rejected: No user found");
            return(new Error("User not found"));
        }

        socket.user = user;
        socket.userId = user._id;

        console.log(`Socket authenticate for user ${user._id}`);

        next();
    } catch (error) {
        console.error("Error in socketAuthProtect: socket.io con rejected", error);
        next(new Error("Unauthorized"));
    }
}