import express from "express"
import { signUp } from "../controller/authController.js"; 

const router = express.Router();

router.post("/signup",signUp)

router.get("/login", (req, res)=>{
    res.send("login");
})

router.get("/logout", (req, res)=>{
    res.send("delete");
})

export default router;