import { Request, Response } from 'express';
import catchAsync from '../middlewares/catchAsync';
import { ChatModel, ChatInterface } from '../models/chatModel';

// Create New Chat
export const newChat = catchAsync(async (req: Request, res: Response) => {
    
    const chatExists = await ChatModel.findOne({
        users: {
            $all: [req.user?._id, req.body.receiverId]
        }
    });

    if (chatExists) {
        return res.status(200).json({
            success: true,
            newChat: chatExists
        });
    }

    const newChat = await ChatModel.create({
        users: [req.user?._id, req.body.receiverId],
    });

    res.status(200).json({
        success: true,
        newChat
    });
});

// Get All Chats
export const getChats = catchAsync(async (req: Request, res: Response) => {
    const chats: ChatInterface[] = await ChatModel.find({
        users: {
            $in: [req.user?._id]
        }
    }).sort({ updatedAt: -1 }).populate("users latestMessage");

    res.status(200).json({
        success: true,
        chats
    });
});
