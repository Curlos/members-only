import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext';

const SignUp = () => {

  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleFullNameChange = (e) => {
    console.log(e.target.value)
    setFullName(e.target.value)
  }

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
    
    console.log(fullName)
    console.log(username)
    console.log(password)

    const body = {
      fullName,
      username, 
      password
    }

    const data = await axios.post('http://localhost:8888/users/sign-up', body)

    console.log(data)
    history.push("/")
    return data
  }

  return (
    <form onSubmit={handleSubmit} className="signUpForm">
      <div className="logo">💉</div>
      <div className="title">Create your account</div>
      <div>
        <input type="text" value={fullName} placeholder="Full Name" onChange={handleFullNameChange}></input>
      </div>
      <div>
        <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange}></input>
      </div>
      <div>
        <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange}></input>
      </div>
      <div>
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </form>
  )
}

export default SignUp;