import { Request, Response } from "express";
import { TweetModel } from "../models/tweetModel";
import { UserModel } from "../models/userModel";

export const createTweet = async (req: Request, res: Response) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res
        .status(401)
        .json({ message: "Fields are required!", success: false });
    }

    await TweetModel.create({
      description,
      userId: id,
    });

    return res
      .status(201)
      .json({ message: "Tweet posted successfully!", success: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await TweetModel.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Tweet deleted successfully", success: true });
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
      return res.status(200).json({ message: "Tweet Disliked!" });
    } else {
      await TweetModel.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      return res.status(200).json({ message: "Tweet Liked!" });
    }
  } catch (error) {
    console.log(error);
  }
};

// GET ALL TWEETS CONTROLLER

export const getAllTweets = async (req: Request, res: Response) => {
  // Logged in + Following user tweets

  try {
    const id = req.params.id;

    const loggedInUser = await UserModel.findById(id);

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const loggedInUserTweets = await TweetModel.find({ userId: loggedInUser });

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return TweetModel.find({ userId: otherUserId });
      })
    );

    const allTweets = loggedInUserTweets.concat(...followingUserTweets);

    return res.status(200).json({ tweets: allTweets });
  } catch (error) {
    console.log(error);
  }
};

// GET FOLLOWING TWEETS ONLY

export const getFollowingTweets = async (req: Request, res: Response) => {

  try {
    const id = req.params.id;

    const loggedInUser = await UserModel.findById(id);

    if (!loggedInUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingUserTweets = await Promise.all(
      loggedInUser.following.map((otherUserId) => {
        return TweetModel.find({ userId: otherUserId });
      })
    );

    return res.status(200).json({ tweets: followingUserTweets });
  } catch (error) {
    console.log(error);
  }
};