import express from "express"
import { signUp, login } from "../controller/authController.js"; 

const router = express.Router();

router.post("/signup",signUp)

router.post("/login", login)

router.get("/logout", (req, res)=>{
    res.send("delete");
})

export default router;