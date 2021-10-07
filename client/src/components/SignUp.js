import React, { useState } from 'react';
import axios from 'axios'
import LoginContext from '../contexts/LoginContext';

const SignUp = () => {

  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log(isLoggedIn)

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
    return data
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Create your account</div>
      <input type="text" value={fullName} placeholder="Full Name" onChange={handleFullNameChange}></input>
      <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange}></input>
      <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange}></input>
      <button onClick={handleSubmit}>Sign Up</button>
    </form>
  )
}

export default SignUp;