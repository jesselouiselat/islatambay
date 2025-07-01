// ✅ CLEANED server.js for local + production
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./config/passport.js";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import heroRoutes from "./routes/heroRoutes.js";
import amenityRoutes from "./routes/amenityRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const PgSession = connectPgSimple(session);

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.VERCEL_ORIGIN],
    credentials: true,
  })
);

app.use(
  session({
    store: new PgSession({ pool, tableName: "session" }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(express.json());
configurePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin/heroes", heroRoutes);
app.use("/api/admin/amenities", amenityRoutes);
app.use("/api/admin/packages", packageRoutes);

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
