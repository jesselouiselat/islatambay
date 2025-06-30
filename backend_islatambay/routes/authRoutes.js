import express from "express";
import passport from "passport";
import {
  logIn,
  logOut,
  register,
  checkAuth,
  google,
  googleCallback,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return next(err);

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          isAdmin: user.is_admin,
        },
      });
    });
  })(req, res, next);
});

router.post("/logout", logOut);

router.get("/check-auth", checkAuth);
router.get("/google", google);
router.get("/google/callback", googleCallback);

export default router;
