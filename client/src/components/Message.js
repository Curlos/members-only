import React, { useState, useEffect } from 'react'
import LoginContext from '../contexts/LoginContext';
import axios from 'axios'

const Message = ({ message }) => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)
  const [user, setUser] = useState('')

  useEffect(() => {
    const getUserFromAPI = async () => {
      const response = await axios.get(`http://localhost:8888/users/user/${message.createdBy}`)
      const newUser = response.data
      setUser(newUser)
    }

    getUserFromAPI()
  }, [])

  return (
    <div class="messageContainer">
      <div class="messageTitle">{message.title}</div>
      <div class="messageText">{message.text}</div>
      <div className="messageFooter">
        <div className="left">
          <div className="userIcon">
            <i class={user.icon || "fas fa-user-md"}></i>
          </div>
          <div className="userNames">
            <div className="fullName">{isLoggedIn ? user.fullName || user.username : 'Anonymous'}</div>
            <div className="username">@{isLoggedIn ? user.username : 'Anonymous'}</div>
          </div>
        </div>
        <div className="messageTimestamp">{message.timestamp}</div>
      </div>
    </div>
  )
}

export default Message;