import express from "express";
import {
  bookmark,
  getMyProfile,
  Logout,
  SignIn,
  SignUp,
} from "../controllers/userController";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/logout", Logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);
router.get("/profile/:id", isAuthenticated, getMyProfile);

export default router;
