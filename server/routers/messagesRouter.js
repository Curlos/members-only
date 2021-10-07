const express = require('express')
const { User, Message } = require('../models/models')
const router = express.Router()

router.get('/', async(req, res) => {
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

module.exports = router;