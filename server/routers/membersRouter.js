const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')

const router = express.Router()

router.get('/', async(req, res) => {
  res.json({user: 'user'})
})

module.exports = router;