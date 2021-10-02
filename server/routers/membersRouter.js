const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User, Message } = require('../models/models')
const bcrypt = require("bcryptjs")
const router = express.Router()

const MEMBER_PASSCODE = 'member'
const ADMIN_PASSCODE = 'admin'


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
  console.log(req)
  return res.json({message: 'Username or password not matching'})
})

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/members//success",
    failureRedirect: "/members/failure"
  })
);

router.get('/messages', async(req, res) => {
  const messages = await Message.find({})
  return res.json(messages)
})

router.post('/message', async (req, res) => {
  console.log(req.body.createdBy)

  const user = await User.findOne({username: req.body.createdBy})

  if (!user) {
    console.log('not found')
    return res.send('user not found')
  }

  const message = await new Message({
    title: req.body.title,
    text: req.body.text || '',
    createdBy: user,
  })

  user.messages = [...user.messages, message]

  await message.save()
  await user.save()

  return res.json(message)
})

router.post('/user', async (req, res) => {

  const user = await User.findOne({username: req.body.username})
  const messages = []

  if (!user) {
    return res.send('User not found')
  }

  for (let messageID of user.messages) {
    const message = await Message.findOne({_id: messageID})

    messages.push(message)
    console.log(messages)
  }
  

  return res.json(messages)
})

router.delete('/message/:messageID', async (req, res) => {
  const message = await Message.findOne({_id: req.params.messageID})

  if (!message) {
    return res.json('message not found')
  }

  const user = await User.findOne({_id: message.createdBy})

  if (!user) {
    console.log('not found')
    return res.send('user not found')
  }

  user.messages = user.messages.filter((id) => id.toString() !== req.params.messageID)

  await Message.findByIdAndDelete(message._id)
  await user.save()

  return res.json(message)
})

router.put('/membership/member', async (req, res) => {
  const { username, guessedPasscode } = req.body

  if (!username || !guessedPasscode) {
    return res.send('Missing props!')
  }

  if (guessedPasscode === MEMBER_PASSCODE) {
    console.log(guessedPasscode)
    const user = await User.findOne({username: username})

    if (!user) {
      return res.send('User not found')
    } else {
      user.membershipStatus = 'Member'
      await user.save()
      return res.json(user)
    }
  }

  return res.send('Incorrect passcode')
})

router.put('/membership/admin', async (req, res) => {
  const { username, guessedPasscode } = req.body

  if (!username || !guessedPasscode) {
    return res.send('Missing props!')
  }
  
  if (guessedPasscode === ADMIN_PASSCODE) {
    console.log(guessedPasscode)
    const user = await User.findOne({username: username})

    if (!user) {
      return res.send('User not found')
    } else {
      user.membershipStatus = 'Admin'
      await user.save()
      return res.json(user)
    }
  }

  return res.send('Incorrect passcode')
})

module.exports = router;