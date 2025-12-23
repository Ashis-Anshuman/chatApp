import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getContacts, getMessages, sendMessage, getChatPatners } from "../controller/messageController.js";
import { arcjetProtect } from "../middleware/arcjetMiddleware.js";


const router = express.Router();

router.get("/contacts", arcjetProtect, protectRoute, getContacts);
router.get("/chats", arcjetProtect, protectRoute, getChatPatners);
router.get("/:id", arcjetProtect, protectRoute, getMessages);
router.post("/send/:id", arcjetProtect, protectRoute, sendMessage);

export default router;