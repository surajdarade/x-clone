import express from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getFollowingTweets,
  getProfileTweets,
  likeOrDislike,
} from "../controllers/tweetController";
import { uploadPost } from "../utils/awsFunctions";

const router = express.Router();

router.post("/create", uploadPost.single("postImage"), createTweet);
router.delete("/delete/:id", deleteTweet);
router.put("/like/:id", likeOrDislike);
router.get("/allTweets/:id", getAllTweets);
router.get("/followingTweets/:_id", getFollowingTweets);
router.get("/profileTweets/:_id", getProfileTweets);

export default router;
