import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

// Resolve the absolute path to the .env file
const envPath = path.resolve(__dirname, "../.env");

// Load environment variables from the .env file
dotenv.config({ path: envPath });

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated!", success: false });
    }
    const jwtSecret = process.env.JWT_SECRET as string;
    const decode = jwt.verify(token, jwtSecret);

    next();
  } catch (error) {
    console.error(error);
  }
};

export default isAuthenticated;
