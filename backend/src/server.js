// const express = require("express");
import express from "express"
import dotenv from "dotenv"
import authRouter from "./routers/authRoute.js"

dotenv.config();

const PORT = process.env.PORT||3000;
const app = express();

app.get("/ass", (req, res)=>{
    res.send("fdjjdh");
})

app.use("/api/auth", authRouter)

app.listen(PORT, ()=>{
    console.log("app listen on the port "+PORT);
})