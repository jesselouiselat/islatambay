import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import passport from "passport";
import env from "dotenv";

env.config();
const saltRounds = 11;

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hash]
    );
    const user = result.rows[0];

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });
      req.session.save(() => res.status(200).json(result.rows));
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logIn = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Login failed" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login error" });
      req.session.save(() => {
        res.status(200).json({
          message: "Login successful",
          user: {
            id: user.id,
            email: user.email,
            isAdmin: user.is_admin,
          },
        });
      });
    });
  })(req, res, next);
};

export const logOut = (req, res) => {
  req.logOut(() => res.json({ message: "Logged out" }));
};

export const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      loggedIn: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        isAdmin: req.user.is_admin,
      },
    });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};

export const google = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = passport.authenticate("google", {
  successRedirect: isProduction
    ? `${process.env.VERCEL_ORIGIN}/dashboard`
    : "http://localhost:5173/dashboard",

  failureRedirect: isProduction
    ? `${process.env.VERCEL_ORIGIN}/login`
    : "http://localhost:5173/login",
});
