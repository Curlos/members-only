import React from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import axios from 'axios'

const Header = () => {

  const { loggedInUser } = React.useContext(UserContext)
  console.log(loggedInUser)
  console.log(Object.keys(loggedInUser).length)


  const handleLogout = () => {
    console.log('logout')
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
            <span>{loggedInUser.username}</span>
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