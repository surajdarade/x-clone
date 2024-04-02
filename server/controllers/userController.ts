import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { TweetModel } from "../models/tweetModel";

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

// SIGNUP CONTROLLER
export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "Please fill all fields!",
        success: false,
      });
    }

    const user = await UserModel.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (user) {
      return res.status(401).json({
        message: "Email or Username is already in use!",
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
        message: "Please fill all fields!",
        success: false,
      });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials!",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials!",
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
      .json({
        message: `Welcome User @${user.username} !`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

// LOGOUT CONTROLLER

export const Logout = (req: Request, res: Response) => {
  return res
    .cookie("token", "", { expires: new Date(Date.now()) })
    .json({ message: "Logged out succefully!", success: true });
};

// BOOKMARKS CONTROLLER

export const bookmark = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params._id;

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
      return res
        .status(200)
        .json({ message: "Tweet removed from bookmarks!", success: true });
    } else {
      // add as bookmark
      await UserModel.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res
        .status(200)
        .json({ message: "Tweet bookmarked!", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

// GET BOOKMARK CONTROLLER

export const getMyBookmarks = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.params._id;

    // Find the user by ID
    const user = await UserModel.findById(loggedInUserId).select(
      "-id -name -username -email -password -createdAt -updatedAt -followers -following -__v"
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Fetch details of tweets corresponding to each bookmark ID
    const bookmarkedTweets = await TweetModel.find({
      _id: { $in: user.bookmarks }, // Access the bookmarks directly from the user object
    });

    return res.status(200).json({ tweets: bookmarkedTweets, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// GETPROFILE CONTROLLER

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.params._id;

    const user = await UserModel.findById({ _id: loggedInUserId }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Aggregate to count the tweets where userId matches _id of the user
    const tweetCount = await TweetModel.aggregate([
      {
        $match: { userId: user._id },
      },
      {
        $count: "tweetCount",
      },
    ]);
    const count = tweetCount.length > 0 ? tweetCount[0].tweetCount : 0;

    const profileWithTweetCount = {
      ...user.toJSON(),
      tweetCount: count,
    };

    return res.status(200).json({
      profile: profileWithTweetCount,
    });

  } catch (error) {
    console.log(error);
  }
};

// GET OTHER USERS CONTROLLER
export const getOtherUsers = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    // Aggregate pipeline to select random 4 users excluding the logged-in user
    // Ensure _id is converted to ObjectId
    const loggedUserId = new mongoose.Types.ObjectId(_id);

    // Aggregate pipeline to select random 4 users excluding the logged-in user
    const otherUsers = await UserModel.aggregate([
      { $match: { _id: { $ne: loggedUserId } } }, // Exclude logged-in user
      { $sample: { size: 4 } } // Select 4 random users
    ]);

    if (!otherUsers || otherUsers.length === 0) {
      return res.status(404).json({ message: 'No other users found' });
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
      return res.status(404).json({ message: "User to follow not found!" });
    }

    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found!" });
    }

    if (!user.followers.includes(loggedInUserId)) {
      await user.updateOne({ $push: { followers: loggedInUserId } });
      await loggedInUser.updateOne({ $push: { following: idOfUserToFollow } });
      return res
        .status(200)
        .json({ message: `You started following @${user.username} !` });
    } else {
      return res.status(400).json({
        message: `You are already following @${user.username} !`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// UNFOLLOW CONTROLLER

export const unfollow = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.id;
    const idOfUserToUnFollow = req.params.id;

    // Convert string ID to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(loggedInUserId);
    const objectIdUserToUnFollow = new mongoose.Types.ObjectId(
      idOfUserToUnFollow
    );

    const loggedInUser = await UserModel.findById(objectIdUserId);
    const user = await UserModel.findById(objectIdUserToUnFollow);

    if (!user) {
      return res.status(404).json({ message: "User to unfollow not found!" });
    }

    if (!loggedInUser) {
      return res.status(404).json({ message: "Logged-in user not found!" });
    }

    if (loggedInUser.following.includes(objectIdUserToUnFollow)) {
      await user.updateOne({ $pull: { followers: objectIdUserId } });
      await loggedInUser.updateOne({
        $pull: { following: objectIdUserToUnFollow },
      });
      return res
        .status(200)
        .json({ message: `You stopped following @${user.username} !` });
    } else {
      return res.status(400).json({
        message: `You are not following @${user.username} !`,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
