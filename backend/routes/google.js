const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const google = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UsersModel = require("../models/UsersModel");

google.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

google.use(passport.initialize());

google.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4042/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await UsersModel.findOne({ email: profile._json.email });
        if (!user) {
          const { _json: user } = profile;
          const userToSave = new UsersModel({
            name: user.given_name,
            surname: user.family_name,
            username: `${user.given_name}_${user.family_name}`,
            email: user.email,
            dob: new Date(),
            password: "12345678",
            role: "user",
            img: user.picture,
          });
          await userToSave.save();
        }
      } catch (error) {
        console.log(error);
      }
      return done(null, profile);
    }
  )
);

google.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
  (req, res) => {
    const redirectUrl = `http://localhost:5173/success?user=${encodeURIComponent(
      JSON.stringify(req.user)
    )}`;
    res.redirect(redirectUrl);
  }
);

google.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user;
    console.log(user);
    const token = jwt.sign(user, process.env.JWT_SECRET);
    const redirectUrl = `http://localhost:5173/success/${encodeURIComponent(
      token
    )}`;
    res.redirect(redirectUrl);
  }
);

google.get("/success", (req, res) => {
  res.redirect("http://localhost:5173/home");
});

google.get("/oauth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("errore");
    }

    req.session.destroy((error) => {
      if (error) {
        console.log(error)
      }

      res.redirect("/");
    });
  });
});

module.exports = google;
