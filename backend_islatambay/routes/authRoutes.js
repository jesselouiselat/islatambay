import express from "express";
import passport from "passport";
import {
  logIn,
  logOut,
  register,
  checkAuth,
  googleCallback,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", logIn);

router.post("/logout", logOut);

router.get("/check-auth", checkAuth);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", googleCallback);

export default router;
