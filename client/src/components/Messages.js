import React, { useState, useEffect } from 'react';
import Message from './Message'
import MessagesContext from '../contexts/MessagesContext';
import axios from 'axios'


const Messages = () => {

  const { messages, setMessages } = React.useContext(MessagesContext)

  useEffect(() => {

    const fetchMessages = async () => {
      const response = await axios.get('http://localhost:8888/messages')
      const newMessages = response.data
      setMessages(newMessages)
    }

    fetchMessages()
  }, [])

  console.log(messages)

  return (
    <div class="messagesContainer">
      {messages.map((message) => {
        return (
          <Message message={message}/>
        )
      })}
    </div>
  )
}

export default Messages;