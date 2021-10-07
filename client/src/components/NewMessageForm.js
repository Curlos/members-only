import React, { useState } from 'react';
import LoginContext from '../contexts/LoginContext';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const NewMessageForm = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)
  const { loggedInUser, setLoggedInUser } = React.useContext(UserContext)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const history = useHistory()

  console.log(isLoggedIn)
  console.log(loggedInUser)

  const handleTitleChange = (e) => {
    console.log(e.target.value)
    setTitle(e.target.value)
  }

  const handleTextChange = (e) => {
    console.log(e.target.value)
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const body = {
      "title": title,
      "text": text,
      "createdBy": loggedInUser.username
    }

    try {
      const response = await axios.post('http://localhost:8888/messages/message', body)

      history.push("/")

      return response.data
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} class="newMessageForm">
      <div className="logo">💉</div>
      <div className="title">Create Message</div>
      <div>
        <input type="text" value={title} placeholder="Title" onChange={handleTitleChange}></input> 
      </div>
      <div>
        <textarea type="password" value={text} onChange={handleTextChange}></textarea>
      </div>
      <button onClick={handleSubmit} class="createMessageButton">Create Message</button>
    </form>
  )
}

export default NewMessageForm;