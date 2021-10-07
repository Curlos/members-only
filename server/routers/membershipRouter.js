const express = require('express')
const { User, Message } = require('../models/models')
const router = express.Router()

const MEMBER_PASSCODE = 'member'
const ADMIN_PASSCODE = 'admin'

router.put('/member', async (req, res) => {
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

router.put('/admin', async (req, res) => {
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