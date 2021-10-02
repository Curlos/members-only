const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, Message } = require('../models/models')
const bcrypt = require("bcryptjs")
const router = express.Router()


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      } else {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            return done(null, user)
          } else {
            // passwords do not match!
            return done(null, false, { message: "Incorrect password" })
          }
        })
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  return done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    return done(err, user);
  });
});

router.get('/', async(req, res) => {
  res.json({user: 'user'})
})

router.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/sign-up", async (req, res, next) => {
  const newUsername = req.body.username
  const newPassword = req.body.password

  const userFound = await User.find({username: newUsername})

  if (userFound.length > 0) {
    return res.json({error: 'Username taken'})
  }

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return err
    }

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      membershipStatus: 'Anonymous',
      messages: []
    }).save(err => {
      if (err) { 
        return next(err);
      }
      return res.redirect("/members");
    });
  })
});

router.get('/success', (req, res) => {
  return res.json({user: req.user})
})

router.get('/failure', (req, res) => {
  console.log(req.user)
  return res.json({user: req.user})
})

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/members//success",
    failureRedirect: "/members/failure"
  })
);

module.exports = router;