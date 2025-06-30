import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import { pool } from "./db.js";
import bcrypt from "bcrypt";
import env from "dotenv";

env.config();

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
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("✅ Google profile:", profile);
        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [profile.email]
        );

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
    console.log("✅ serializeUser:", user.id);
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
    } catch (error) {
      return done(error);
    }
  });
}
