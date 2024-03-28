import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes";
import tweetRoute from "./routes/tweetRoutes";
import isAuthenticated from "./middlewares/auth";

const app = express();

// DONTENV CONFIG
dotenv.config();

// CORS POLICY
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API ENDPOINTS
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", isAuthenticated, tweetRoute);

export default app;
