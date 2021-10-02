const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8888
const membersRouter = require('./routers/membersRouter')
const database = require('./database/connection')


app.use(cors())
app.use(express.json())
app.use('/members', membersRouter)

app.listen(PORT, () => {
  database.connectToServer((err) => {
    if (err) {
      console.error(err)
    }
  })

  console.log(`Server is listening on port ${PORT}`)
})