import { Request, Response } from "express";
import { TweetModel } from "../models/tweetModel";

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
