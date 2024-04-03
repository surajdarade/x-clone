import { Request, Response } from "express";
import catchAsync from "../middlewares/catchAsync";
import { MessageModel, MessageInterface } from "../models/messageModel";
import { ChatModel } from "../models/chatModel";

// Send New Message
export const newMessage = catchAsync(async (req: Request, res: Response) => {
  const { chatId, content } = req.body;

  const msgData = {
    sender: req.user?._id,
    chatId,
    content,
  };

  const newMessage = await MessageModel.create(msgData);

  await ChatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage });

  res.status(200).json({
    success: true,
    newMessage,
  });
});

// Get All Messages
export const getMessages = catchAsync(async (req: Request, res: Response) => {
  const messages: MessageInterface[] = await MessageModel.find({
    chatId: req.params.chatId,
  });

  res.status(200).json({
    success: true,
    messages,
  });
});
