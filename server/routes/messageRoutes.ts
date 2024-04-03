import express from 'express';
import { newMessage, getMessages } from '../controllers/messageController';
import isAuthenticated from '../middlewares/auth';

const router = express.Router();

router.post("/newMessage", isAuthenticated, newMessage);
router.get("/messages/:chatId", isAuthenticated, getMessages);

export default router;
