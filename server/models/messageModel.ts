import mongoose, { Document, Model, Types } from 'mongoose';

export interface MessageInterface extends Document {
    sender: Types.ObjectId;
    chatId: Types.ObjectId;
    content: string;
}

const messageSchema = new mongoose.Schema<MessageInterface>(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { timestamps: true }
);

export const MessageModel: Model<MessageInterface> = mongoose.model<MessageInterface>("Message", messageSchema);
