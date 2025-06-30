import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./config/passport.js";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import amenityRoutes from "./routes/amenityRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";

import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
const PgSession = connectPgSimple(session);

app.use(
  cors({
    origin: process.env.VERCEL_ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    store: new PgSession({ pool, tableName: "session", logErrors: true }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use(express.json());

configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("User:", req.user);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin/heroes", heroRoutes);
app.use("/api/admin/amenities", amenityRoutes);
app.use("/api/admin/packages", packageRoutes);

app.get("/debug-session", (req, res) => {
  res.json({
    sessionID: req.sessionID,
    session: req.session,
    user: req.user,
  });
});

app.get("/force-session", (req, res) => {
  req.session.test = "hello";
  req.session.save((err) => {
    if (err) {
      console.error("❌ Could not save session:", err);
      res.status(500).send("Failed to save session");
    } else {
      console.log("✅ Forced session save with ID:", req.sessionID);
      res.send("Session saved!");
    }
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
