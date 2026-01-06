import express from "express"
import { signUp, login, logout, updateProfile, verifyOtp} from "../controller/authController.js"; 
import {protectRoute} from "../middleware/authMiddleware.js";
import { arcjetProtect } from "../middleware/arcjetMiddleware.js";

const router = express.Router();

router.get("/test", arcjetProtect, (req, res)=>{
    res.status(200).json({message: "Arcjet is working fine"});
});

router.post("/signUp", arcjetProtect, signUp);
router.post("/login", arcjetProtect, login);
router.post("/logout", arcjetProtect, logout);
router.post("/verifyEmail", arcjetProtect, verifyOtp);

router.put("/updateProfile", arcjetProtect, protectRoute, updateProfile);
router.get("/check",protectRoute, (req, res)=>{
    res.status(200).json(req.user);
});

export default router;