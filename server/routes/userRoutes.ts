import express from "express";
import {
  bookmark,
  follow,
  getMyBookmarks,
  getMyProfile,
  getOtherUsers,
  Logout,
  searchUsers,
  SignIn,
  SignUp,
  unfollow,
  updateProfile,
  updatePassword,
} from "../controllers/userController";
import isAuthenticated from "../middlewares/auth";
import { uploadAvatar } from "../utils/awsFunctions";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/logout", Logout);
router.put("/bookmark/:_id", isAuthenticated, bookmark);
router.get("/getMyBookmark/:_id", isAuthenticated, getMyBookmarks);
router.get("/profile/:_id", isAuthenticated, getMyProfile);
router.get("/otherUsers/:_id", isAuthenticated, getOtherUsers);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);
router.get("/users", isAuthenticated, searchUsers);
router.put(
  "/update/profile",
  isAuthenticated,
  uploadAvatar.single("avatar"),
  updateProfile
);
router.put("/update/password", isAuthenticated, updatePassword);

export default router;
