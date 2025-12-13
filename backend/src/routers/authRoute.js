import express from "express"
import { signUp, login, logout, updateProfile} from "../controller/authController.js"; 
import {protectRoute} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signUp);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateProfile", protectRoute, updateProfile);
router.get("/check",protectRoute, (req, res)=>{
    res.status(200).json(req.user);
});
export default router;