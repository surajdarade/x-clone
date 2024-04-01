import express from "express";
import {
  bookmark,
  follow,
  getMyProfile,
  getOtherUsers,
  Logout,
  SignIn,
  SignUp,
  unfollow,
} from "../controllers/userController";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/logout", Logout);
router.put("/bookmark/:_id", isAuthenticated, bookmark);
router.get("/profile/:_id", isAuthenticated, getMyProfile);
router.get("/otherUsers/:_id", isAuthenticated, getOtherUsers);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);

export default router;
