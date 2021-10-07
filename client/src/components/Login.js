import React, { useState } from 'react';
import LoginContext from '../contexts/LoginContext';
import UserContext from '../contexts/UserContext';
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)
  const { loggedInUser, setLoggedInUser } = React.useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log(isLoggedIn)
  console.log(loggedInUser)

  const handleUsernameChange = (e) => {
    console.log(e.target.value)
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    console.log(e.target.value)
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)

    const body = {
      "username": username,
      "password": password
    }

    const response = await axios.post('http://localhost:8888/users/login', body)

    console.log(response)

    if (response.data.result === 'success') {
      setIsLoggedIn(true)

      
    } else {
      
    }

    return response.data
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Log in to your account</div>
      <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange}></input>
      <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange}></input>
      <button onClick={handleSubmit}>Log In</button>
    </form>
  )
}

export default Login;