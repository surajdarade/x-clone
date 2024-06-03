import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import { getUserDetailsFromToken } from "../controllers/userController";

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Your frontend's origin
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// online user
const onlineUser = new Set<string>();

io.on("connection", async (socket) => {
  console.log("User Connected: ", socket.id);

  const token = socket.handshake.auth.token;

  // current user details
  const user = await getUserDetailsFromToken(token);

  if ("_id" in user!) {
    // create a room
    socket.join(user?._id);
    onlineUser.add(user?._id);

    io.emit("onlineUser", Array.from(onlineUser));
  } else {
    console.error("User not found or invalid token");
  }

  socket.on("disconnect", () => {
    if ("_id" in user!) {
      onlineUser.delete(user?._id);
    }
    console.log("User Disconnected: ", socket.id);
  });
});

export { app, server };
