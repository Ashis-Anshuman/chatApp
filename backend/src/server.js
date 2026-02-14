// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routers/authRoute.js";
import messageRouter from "./routers/messageRouter.js";
import path from "path";
import cors from "cors";
import {app, server} from "./lib/socketIo.js";
import {dbConnect} from "./lib/database.js";
import { cleanFakeUsers } from "./cron/cleanUnverifiedUser.js";

dotenv.config();

const PORT = process.env.PORT||3000;

app.use(express.json({limit: "5mb"}));
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
app.use(cookieParser());
const __dirname = path.resolve();

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);


//for deployement
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*",(req, res)=>{
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html")) //link frontend to backend
    })
}

server.listen(PORT, ()=>{
    dbConnect();
    // cleanFakeUsers();
    console.log("app listen on the port "+PORT);
})