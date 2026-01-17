// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRoute.js";
import messageRouter from "./routers/messageRouter.js";
import path from "path";
import {dbConnect} from "./lib/database.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT||3000;
const app = express();
app.use(express.json({limit: "5mb"}));
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(cookieParser());
const __dirname = path.resolve();

app.get("/ass", (req, res)=>{
    res.send("fdjjdh"); 
})

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);


//for deployement
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) //link frontend to backend
    })
}

app.listen(PORT, ()=>{
    dbConnect();
    console.log("app listen on the port "+PORT);
})