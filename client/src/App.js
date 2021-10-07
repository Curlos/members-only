import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Header from './components/Header'
import Messages from './components/Messages';
import SignUp from './components/SignUp'
import Login from './components/Login'
import NewMessageForm from './components/NewMessageForm'
import MessagesContext from './contexts/MessagesContext'
import LoginContext from './contexts/LoginContext';
import UserContext from './contexts/UserContext';
import './style.scss';

const App = () => {

  const [messages, setMessages] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})
  
  return (
    <Router>
      <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <UserContext.Provider value={{loggedInUser, setLoggedInUser}}>
          <MessagesContext.Provider value={{messages, setMessages}}>
            <Header />

            <Switch>
              <Route path="/create-message" exact>
                <NewMessageForm />
              </Route>

              <Route path="/sign-up" exact>
                <LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
                  <SignUp />
                </LoginContext.Provider>
              </Route>
              
              <Route path="/login" exact>
                <Login />
              </Route>

              <Route path="/" exact>
                <Messages />
              </Route>
            </Switch>
          </MessagesContext.Provider>
        </UserContext.Provider>
      </LoginContext.Provider>

    </Router>
  );
}

export default App;
