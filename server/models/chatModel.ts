import mongoose, { Document, Model, Types } from 'mongoose';

export interface ChatInterface extends Document {
    users: Types.ObjectId[];
    latestMessage: Types.ObjectId | null;
}

const chatSchema = new mongoose.Schema<ChatInterface>(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
    },
    { timestamps: true }
);

export const ChatModel: Model<ChatInterface> = mongoose.model<ChatInterface>("Chat", chatSchema);
