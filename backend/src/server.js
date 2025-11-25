// const express = require("express");
import express from "express"
import dotenv from "dotenv"
import authRouter from "./routers/authRoute.js"
import path from "path"

dotenv.config();

const PORT = process.env.PORT||3000;
const app = express();
const __dirname = path.resolve();

app.get("/ass", (req, res)=>{
    res.send("fdjjdh");
})

app.use("/api/auth", authRouter)


//for deployement
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) //link frontend to backend
    })
}

app.listen(PORT, ()=>{
    console.log("app listen on the port "+PORT);
})