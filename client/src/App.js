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
import './style.scss';

const App = () => {
  
  return (
    <Router>
      <Header />

      <Switch>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/" exact>
            <Messages />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
