const express = require('express')
const dotenv = require('dotenv').config()
const session = require("express-session");
const passport = require("passport");
const cors = require('cors')
const PORT = process.env.PORT || 8888
const membersRouter = require('./routers/membersRouter')
const database = require('./database/connection')

const app = express()


app.use(cors())
app.use(express.json())

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/members', membersRouter)

app.listen(PORT, () => {
  database.connectToServer((err) => {
    if (err) {
      console.error(err)
    }
  })

  console.log(`Server is listening on port ${PORT}`)
})