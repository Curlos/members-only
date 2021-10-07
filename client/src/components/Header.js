import React from 'react'
import { Link } from 'react-router-dom'
import LoginContext from '../contexts/LoginContext';
import UserContext from '../contexts/UserContext';
import axios from 'axios'

const Header = () => {
  const { setIsLoggedIn } = React.useContext(LoginContext)
  const { loggedInUser, setLoggedInUser } = React.useContext(UserContext)
  console.log(loggedInUser)
  console.log(Object.keys(loggedInUser).length)


  const handleLogout = async () => {
    setIsLoggedIn(false)
    setLoggedInUser({})
    console.log('logout')
    const user = await axios.get('http://localhost:8888/users/logout')
    console.log(user)
  }
  
  return (
    <div class="headerContainer">
      <Link to="/">OnlyVaxxed 💉</Link>
      <span class="right">
        {!loggedInUser || Object.keys(loggedInUser).length === 0 ? (
          <span>
            <Link to="/login">Log In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </span>
        ) : (
          <div>
            <span>
              <Link to="/create-message">Create Message</Link>
              <span class="username">
                <i className={`userIcon ${loggedInUser.icon || 'fas fa-user-md'}`} />{loggedInUser.username}
              </span>
            </span>
            <span>
              <button onClick={handleLogout} class="logoutButton">Logout</button>
            </span>
          </div>
        )}
      </span>
    </div>
  )
}

export default Header;