import express from "express";
import { createTweet, deleteTweet, likeOrDislike } from "../controllers/tweetController";

const router = express.Router();

router.post("/create", createTweet);
router.delete("/delete/:id", deleteTweet);
router.put("/like/:id", likeOrDislike);

export default router;
