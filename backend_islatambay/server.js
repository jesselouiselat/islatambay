import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { configurePassport } from "./config/passport.js";

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

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.VERCEL_ORIGIN],
    credentials: true,
  })
);

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

app.use(express.json());
[];

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
