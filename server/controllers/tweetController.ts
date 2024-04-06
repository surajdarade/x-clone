import { Request, Response } from "express";
import { TweetModel } from "../models/tweetModel";
import { UserModel } from "../models/userModel";
import { CustomFile } from "./userController";
import { UserDetails } from "../models/tweetModel";

export const createTweet = async (
  req: Request & { file?: CustomFile },
  res: Response
) => {
  try {
    const { description, id, postImage } = req.body;

    const tweetData: Partial<{
      description: string;
      userId: string;
      userDetails: UserDetails[];
      postImage: string;
    }> = {
      description,
      userId: id,
      userDetails: [],
    };

    if (!description || !id) {
      return res
        .status(401)
        .json({ message: "Fields are required!", success: false });
    }

    const user = await UserModel.findById(id).select(
      "-password -bookmarks -following -followers -createdAt -updatedAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.file && req.file.location) {
      tweetData.userDetails?.push(user);
      tweetData.postImage = req.file.location;
    } else {
      tweetData.userDetails?.push(user);
    }
    await TweetModel.create(tweetData);

    return res
      .status(201)
      .json({ message: "Tweet posted successfully!", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TweetModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Tweet deleted successfully!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const likeOrDislike = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;

    const tweet = await TweetModel.findOne({ _id: tweetId });

    if (!tweet) {
      return res.status(404).json({ message: "Tweet not found!" });
    }

    if (tweet.like.includes(loggedInUserId)) {
      // dislike
      await TweetModel.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res
        .status(200)
        .json({ message: "Tweet Disliked!", success: true });
    } else {
      await TweetModel.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({ message: "Tweet Liked!", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

// GET ALL TWEETS CONTROLLER

export const getAllTweets = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const loggedInUser = await UserModel.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const loggedInUserTweets = await TweetModel.find({
      userId: loggedInUser,
    }).sort({ createdAt: -1 });
    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return TweetModel.find({ userId: otherUserId }).sort({ createdAt: -1 });
      })
    );

    const allTweets = loggedInUserTweets.concat(...followingUserTweets);
    const sortedTweets = allTweets.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );

    return res.status(200).json({ tweets: sortedTweets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET FOLLOWING TWEETS ONLY

export const getFollowingTweets = async (req: Request, res: Response) => {
  try {
    const id = req.params._id;
    const loggedInUser = await UserModel.findById(id);
    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return TweetModel.find({ userId: otherUserId }).sort({ createdAt: -1 });
      })
    );

    const allTweets = ([] as any[]).concat(...followingUserTweets);
    const sortedTweets = allTweets.sort((a, b) =>
      new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
    );

    return res.status(200).json({ tweets: sortedTweets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// GET PROFILE TWEETS ONLY

// GET FOLLOWING TWEETS ONLY

export const getProfileTweets = async (req: Request, res: Response) => {
  try {
    const userId = req.params._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const profileTweets = await TweetModel.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ tweets: profileTweets });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
