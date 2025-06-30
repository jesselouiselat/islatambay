import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import passport from "passport";

const saltRounds = 11;

export const register = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received!", email, password);

  try {
    const checkResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Check if email already exists in the database. Server will suggest to log in
    if (checkResult.rows.length > 0) {
      res
        .status(400)
        .json({ message: "Email already exists. Try logging in." });

      // Server will record/save the registraion details to the database
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error hashing the password:", err);
        } else {
          const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.logIn(user, (err) => {
            if (err) {
              console.log("Login error after registration:", err);
              return res.status(500).json({ message: "Login error" });
            }

            req.session.save(() => {
              res.status(200).json(result.rows);
            });
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logIn = async (req, res) => {
  req.session.save(() => {
    res.status(200).json({
      message: "Login successful",
      user: {
        id: req.user.id,
        email: req.user.email,
        isAdmin: req.user.is_admin,
      },
    });
  });
};

export const logOut = async (req, res) => {
  req.logOut((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully!" });
  });
};

export const checkAuth = async (req, res) => {
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
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login",
});
