import express, { json } from "express";
import cors from "cors";
import multer from "multer";

// For local database
import { Pool } from "pg";

// For hashing, session, login(local, google)
import bcrypt from "bcrypt";
import session from "express-session";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";

// For cloud storage
import { v2 as cloudinary } from "cloudinary";

import env from "dotenv";

const app = express();
const port = 5000;
const saltRounds = 11;
env.config();

const pool = new Pool({
  user: process.env.POOL_USER,
  host: process.env.POOL_HOST,
  password: process.env.POOL_PASSWORD,
  database: process.env.POOL_DATABASE,
  port: process.env.POOL_PORT,
});

pool.connect();

// ==================== MIDDELWARES ====================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const upload = multer();

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// ==================== IMAGE/VIDEO STORAGE (CLOUDINARY) ====================

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==================== LOGIN ====================

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );
        // Check if there is a user in the database
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          // Compare the hashed password from the db to the user-entered password
          bcrypt.compare(password, storedHashedPassword, (err, result) => {
            if (err) {
              console.log("Error comparing passwords", err);
            } else {
              if (result) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Incorrect password" });
              }
            }
          });
          // Respond with user not found
        } else {
          return done(null, false, { message: "User not found." });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("✅ Google profile:", profile);
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        profile.email,
      ]);

      if (result.rows.length === 0) {
        const newUser = await pool.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
          [profile.email, "google"]
        );
        console.log(newUser);

        done(null, newUser.rows[0]);
      } else {
        done(null, result.rows[0]);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      return done(null, result.rows[0]);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error);
  }
});

// ==================== ROUTES ====================

app.post("/api/register", async (req, res) => {
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
            console.log(err);
            console.log(result);
            res.status(200).json(result.rows);
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    message: "Login successful",
    user: {
      id: req.user.id,
      email: req.user.email,
      isAdmin: req.user.is_admin,
    },
  });
});

app.get("/api/check-auth", (req, res) => {
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
});

app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/api/admin/get-admin-users", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE is_admin = true ORDER BY email ASC"
  );
  const adminUsers = result.rows;
  res.status(200).json(adminUsers);
});

app.post("/api/admin/promote-user", async (req, res) => {
  const { targetEmail, userAdminPassword } = req.body;
  const currentUser = req.user;
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const checkResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      currentUser.id,
    ]);
    const user = checkResult.rows[0];
    const match = await bcrypt.compare(userAdminPassword, user.password);
    if (!match) {
      return res.status(403).json({ message: "Incorrect password" });
    }
    const update = await pool.query(
      "UPDATE users SET is_admin = true WHERE email = $1",
      [targetEmail]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: `${targetEmail} is now an admin.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/admin/remove-admin", async (req, res) => {
  const { targetEmail, userAdminPassword } = req.body;
  const currentUser = req.user;

  if (
    targetEmail === "islatambayfreediving@gmail.com" ||
    target === "jesselouiselat@gmail.com"
  ) {
    return res.status(401).json({ message: "Can't remove the main admin" });
  }
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const checkResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      currentUser.id,
    ]);
    const user = checkResult.rows[0];
    const match = await bcrypt.compare(userAdminPassword, user.password);
    if (!match) {
      return res.status(403).json({ message: "Incorrect password" });
    }
    const update = await pool.query(
      "UPDATE users SET is_admin = false WHERE email = $1",
      [targetEmail]
    );

    if (update.rowCount === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: `${targetEmail} is removed from Admin List.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/admin/upload/packages", upload.none(), async (req, res) => {
  try {
    const { title, price, features } = req.body;
    const jsonString = JSON.stringify(features);
    const result = await pool.query(
      "INSERT INTO packages (title, price, features) VALUES ($1, $2, $3)",
      [title, price, jsonString]
    );
    res.status(200).json({ message: `${title} is successfully added.` });
  } catch (error) {
    res.json({ message: "Soemthing went wrong" });
    console.error(error);
  }
});

app.get("/api/admin/get-pacakages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM packages");
    const packages = result.rows;
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
  }
});

app.delete("/api/admin/delete-packages", upload.none(), async (req, res) => {
  const { title, id } = req.query;
  console.log(title);
  console.log(id);

  try {
    const result = await pool.query("DELETE FROM packages WHERE id = $1", [id]);
    res.status(200).json({ message: `Deleted ${title} successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/logout", (req, res) => {
  req.logOut((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully!" });
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port: ${port}`);
});
