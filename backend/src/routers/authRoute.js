import express from "express"

const router = express.Router();

router.get("/signup",(req, res)=>{
    res.send("signUp");
})

router.get("/login", (req, res)=>{
    res.send("login");
})

router.get("/logout", (req, res)=>{
    res.send("delete");
})

export default router;