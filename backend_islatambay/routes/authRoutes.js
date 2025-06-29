import express from "express";
import passport from "passport";
import {
  logIn,
  register,
  checkAuth,
  google,
  googleCallback,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate("local"), logIn);

router.get("/check-auth", checkAuth);
router.get("/google", google);
router.get("/google/callback", googleCallback);

export default router;
