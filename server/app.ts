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
    origin: "https://x-clone-surajdarade.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API ENDPOINTS
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", isAuthenticated, tweetRoute);

export default app;
