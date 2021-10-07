import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext';

const SignUp = () => {

  const { isLoggedIn, setIsLoggedIn } = React.useContext(LoginContext)

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameTaken, setUsernameTaken] = useState(false)
  const [passwordTooWeak, setPasswordTooWeak] = useState(false)
  const [icon, setIcon] = useState('fas fa-user-nurse')

  const history = useHistory()

  const userIcons = ['fas fa-user-md', 'fas fa-user-nurse', 'fas fa-syringe', 'fas fa-stethoscope', 'fas fa-hands-wash', 'fas fa-biohazard', 'fas fa-viruses', 'fas fa-virus-slash']

  const handleFullNameChange = (e) => {
    setFullName(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleIconClick = (newIcon) => {
    setIcon(newIcon)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log(fullName)
    console.log(username)
    console.log(password)
    console.log(icon)

    const body = {
      fullName,
      username, 
      password,
      icon
    }

    try {

      const response = await axios.post('http://localhost:8888/users/sign-up', body)

      console.log(response.data)

      if (response.data.error) {
        setUsernameTaken(true)
      } else {
        if (password.length < 8) {
          setPasswordTooWeak(true)
          return
        }

        setUsernameTaken(false)
        setPasswordTooWeak(false)
        history.push("/")
        return response.data
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signUpForm">
      <div className="logo">💉</div>
      <div className="title">Create your account</div>
      <div>
        <input type="text" value={fullName} placeholder="Full Name" onChange={handleFullNameChange}></input>
      </div>
      <div>
        <input type="text" value={username} placeholder="Username" onChange={handleUsernameChange} className={`${usernameTaken ? 'invalidInput' : ''}`}></input>
      </div>

      {usernameTaken ? <div className="invalidInputText">Username taken</div> : null}

      <div>
        <input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} className={`${passwordTooWeak ? 'invalidInput' : ''}`}></input>
      </div>

      {passwordTooWeak ? <div className="invalidInputText">Password too weak</div> : null}

      <div class="iconOptions">

        {userIcons.map((userIcon) => {
          return (
            <div className={`userIcon ${userIcon === icon ? 'selected' : null}`} onClick={() => handleIconClick(userIcon)}>
            
              <i className={userIcon}></i>
            </div>
          )
        })}

        
      </div>
      <div>
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
    </form>
  )
}

export default SignUp;