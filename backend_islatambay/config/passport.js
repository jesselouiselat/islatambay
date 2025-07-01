import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import { pool } from "./db.js";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

const isProduction = process.env.NODE_ENV === "production";

export function configurePassport(passport) {
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

          if (result.rows.length === 0) {
            return done(null, false, { message: "User not found." });
          }

          const user = result.rows[0];
          const match = await bcrypt.compare(password, user.password);

          if (match) return done(null, user);
          return done(null, false, { message: "Incorrect password" });
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
        callbackURL: isProduction
          ? process.env.GOOGLE_CALLBACK_URL
          : "http://localhost:5000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [profile.email]
          );

          if (result.rows.length === 0) {
            const newUser = await pool.query(
              "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
              [profile.email, "google"]
            );
            return done(null, newUser.rows[0]);
          }

          return done(null, result.rows[0]);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      if (result.rows.length > 0) {
        return done(null, result.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  });
}
