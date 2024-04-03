import express from 'express';
import { newChat, getChats } from '../controllers/chatController';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

router.post("/newChat", isAuthenticated, newChat);
router.get("/chats", isAuthenticated, getChats);

export default router;
