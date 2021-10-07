const mongoose = require('mongoose')
const Schema = mongoose.Schema

const day = new Date()
const timestamp = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate().toString().length === 2 ? day.getDate() : '0' + day.getDate()}, ${day.getHours().toString().length === 2 ? day.getHours() : '0' + day.getHours()}:${day.getMinutes().toString().length === 2 ? day.getMinutes() : '0' + day.getMinutes()}`

const userSchema = new Schema(
  {
    fullName: {type: String},
    username: {type: String, required: true},
    password: {type: String, required: true},
    membershipStatus: {type: String, required: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    likedMessages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    icon: {type: String},
    lowerCaseUsername: {type: String, lowercase: true, trim: true}
  }
)

const messageSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    text: {type: String},
    timestamp: {type: String, default: timestamp},
    likes: {type: Number, default: 0},
    replies: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true}
  }
)

const User = mongoose.model('User', userSchema)
const Message = mongoose.model('Message', messageSchema)

module.exports = {User, Message};