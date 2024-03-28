import express from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from "../controllers/tweetController";

const router = express.Router();

router.post("/create", createTweet);
router.delete("/delete/:id", deleteTweet);
router.put("/like/:id", likeOrDislike);
router.get("/allTweets/:id", getAllTweets);
router.get("/followingTweets/:id", getFollowingTweets);

export default router;
