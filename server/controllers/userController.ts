import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Resolve the absolute path to the .env file
const envPath = path.resolve(__dirname, "../.env");

// Load environment variables from the .env file
dotenv.config({ path: envPath });

// SIGNUP CONTROLLER
export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const user = await UserModel.findOne({
      $or: [
        { email: email }, // Check if email matches
        { username: username }, // Check if username matches
      ],
    });

    if (user) {
      return res.status(401).json({
        message: "Email or Username is already in use",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await UserModel.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(200).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// SIGNIN CONTROLLER

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const jwtSecret = process.env.JWT_SECRET as string;
    const jwtExpire = process.env.JWT_EXPIRE as string;

    const token = jwt.sign(tokenData, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    const expiresInMilliseconds = 86_400_000;
    const expirationDate = new Date(Date.now() + expiresInMilliseconds);

    return res
      .status(201)
      .cookie("token", token, { expires: expirationDate, httpOnly: true })
      .json({ message: `Welcome User @${user.username}`, success: true });
  } catch (error) {
    console.log(error);
  }
};

// LOGOUT CONTROLLER

export const Logout = (req: Request, res: Response) => {
  return res
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({ message: "Logged out succefully", success: true });
};

// BOOKMARKS CONTROLLER

export const bookmark = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const user = await UserModel.findOne({ _id: loggedInUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const objectIdTweetId = new mongoose.Types.ObjectId(tweetId);

    if (user.bookmarks.includes(objectIdTweetId)) {
      // remove
      await UserModel.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      res.status(200).json({ message: "Tweet removed from bookmarks!" });
    } else {
      // add as bookmark
      await UserModel.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      res.status(200).json({ message: "Tweet bookmarked!" });
    }
  } catch (error) {
    console.log(error);
  }
};

// GETPROFILE CONTROLLER

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.params.id;

    const user = await UserModel.findById({ _id: loggedInUserId }).select(
      "-password"
    );

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

// GET OTHER USERS CONTROLLER
export const getOtherUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const otherUsers = await UserModel.find({ _id: { $ne: id } }).select(
      "-password"
    );

    if (!otherUsers) {
      res.status(401).json({ message: "No users found!" });
    }

    return res.status(200).json({ otherUsers });
  } catch (error) {
    console.log(error);
  }
};

// FOLLOW CONTROLLER

export const follow = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.id;
    const idOfUserToFollow = req.params.id;

    const loggedInUser = await UserModel.findById(loggedInUserId);
    const user = await UserModel.findById(idOfUserToFollow);

    if (!user) {
      return res.status(404).json({ message: "User to follow not found" });
    }

    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: idOfUserToFollow } });
      return res.status(200).json({ message: `You started following @${user.username}` });
    } else {
      return res.status(400).json({ message: `You are already following @${user.username}`, success: true});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// UNFOLLOW CONTROLLER

export const unfollow = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.id;
    const idOfUserToUnFollow = req.params.id;

    // Convert string ID to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(loggedInUserId);
    const objectIdUserToUnFollow = new mongoose.Types.ObjectId(idOfUserToUnFollow);

    const loggedInUser = await UserModel.findById(objectIdUserId);
    const user = await UserModel.findById(objectIdUserToUnFollow);

    if (!user) {
      return res.status(404).json({ message: "User to unfollow not found" });
    }

    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found" });
    }

    if (loggedInUser.following.includes(objectIdUserToUnFollow)) {
      await user.updateOne({ $pull: { followers: objectIdUserId } });
      await loggedInUser.updateOne({ $pull: { following: objectIdUserToUnFollow } });
      return res.status(200).json({ message: `You stopped following @${user.username}` });
    } else {
      return res.status(400).json({ message: `You are not following @${user.username}`, success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};