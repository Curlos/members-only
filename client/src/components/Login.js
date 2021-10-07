import React, { useState } from 'react';
import LoginContext from '../contexts/LoginContext';
import UserContext from '../contexts/UserContext';
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)
  const { loggedInUser, setLoggedInUser } = React.useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const history = useHistory()

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
    const user = response.data.user

    console.log(response)

    if (user) {
      setIsLoggedIn(true)
      setLoggedInUser(user)
      console.log(user)
      history.push("/")
      setInvalidCredentials(false)
    } else {
      setInvalidCredentials(true)
    }

    return response.data
  }

  return (
    <form onSubmit={handleSubmit} class="loginForm">
      <div className="logo">💉</div>
      <div className="title">Log in to OnlyVaxxed</div>
      <div>
        <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange} className={`${invalidCredentials ? 'invalidInput' : ''}`}></input>
      </div>

      <div>
        <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} className={`${invalidCredentials ? 'invalidInput' : ''}`}></input>
      </div>

      {invalidCredentials ? <div className="invalidInputText">Invalid credentials</div> : null}
      <button onClick={handleSubmit}>Log In</button>
    </form>
  )
}

export default Login;