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
router.put("/bookmark/:id", isAuthenticated, bookmark);
router.get("/profile/:id", isAuthenticated, getMyProfile);
router.get("/otherUsers/:id", isAuthenticated, getOtherUsers);
router.post("/follow/:id", isAuthenticated, follow);
router.post("/unfollow/:id", isAuthenticated, unfollow);

export default router;
