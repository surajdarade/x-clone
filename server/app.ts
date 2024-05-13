import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userRoutes";
import tweetRoute from "./routes/tweetRoutes";
import isAuthenticated from "./middlewares/auth";
import cors from "cors";

const app = express();

// Load environment variables
dotenv.config();

// Parse incoming requests with JSON payloads
app.use(express.json());
// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
// Parse cookies from incoming requests
app.use(cookieParser());

const allowedOrigins = [
  'https://x-clone-surajdarade.vercel.app',
  'https://x-clone-surajdarade.vercel.app/',
  'https://x-clone-surajdarade.vercel.app/api/v1/user',
  'https://x-clone-surajdarade.vercel.app/api/v1/user/',
  'https://x-clone-surajdarade.vercel.app/api/v1/tweet',
  'https://x-clone-surajdarade.vercel.app/api/v1/tweet/',
]

// Apply CORS middleware
const corsOptions ={
  origin: allowedOrigins, 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

// API endpoints
// Mount user routes
app.use("/api/v1/user", userRoute);
// Mount tweet routes with authentication middleware
app.use("/api/v1/tweet", isAuthenticated, tweetRoute);

export default app;
