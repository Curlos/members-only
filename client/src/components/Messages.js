import React, { useState, useEffect } from 'react';
import Message from './Message'
import axios from 'axios'


const Messages = () => {

  const [messages, setMessages] = useState([])

  useEffect(() => {

    const fetchMessages = async () => {
      const response = await axios.get('http://localhost:8888/members/messages')
      const newMessages = response.data
      setMessages(newMessages)
    }

    fetchMessages()
  }, [])

  console.log(messages)

  return (
    <div>
      {messages.map((message) => {
        return (
          <Message message={message}/>
        )
      })}
    </div>
  )
}

export default Messages;