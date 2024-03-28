import express from "express";
import { bookmark, Logout, SignIn, SignUp } from "../controllers/userController";
import isAuthenticated from "../middlewares/auth";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.get("/logout", Logout);
router.put("/bookmark/:id", isAuthenticated, bookmark);

export default router;