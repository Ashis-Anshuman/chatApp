import {Server} from 'socket.io';
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import { socketAuthProtect } from '../middleware/socketIoMiddleware.js';
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

io.use(socketAuthProtect);

const userSoketMap = {};

export function getReceiverSocketId(userId){
    return userSoketMap[userId];
};

io.on("connection", (socket)=>{
    console.log(`A user connected ${socket.user.fullName}`);

    const userId = socket.userId;
    userSoketMap[userId] = socket.id;

    io.emit("online-users", Object.keys(userSoketMap));

    socket.on("disconnect", ()=>{
        console.log(`A user disconnected ${socket.user.fullName}`);
        delete userSoketMap[userId];
        io.emit("online-users", Object.keys(userSoketMap));
    });
});

export {server, app, io};