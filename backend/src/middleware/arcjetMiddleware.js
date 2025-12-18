import aj from "../lib/arcjet.js";
import {isSpoofedBot} from "@arcjet/inspect";

export const arcjetProtect = async (req, res, next)=>{
    try {
        const desison = await aj.protect(req);
        if(desison.isDenied()){
            if(desison.reason.isRateLimit()){
                return res.status(429).json({message: "Too many requests, please try again later."});
            }else if(desison.reason.isBot()){
                return res.status(403).json({message: "Access denied for bots."});
            }
        }

        if(desison.results.some(isSpoofedBot)){
            return res.status(403).json({message: "Bad request"});
        }

        next();
    } catch (error) {
        console.error("Arcjet protection failed:", error);
        res.status(500).json({message: "Internal server error"});
    }
}