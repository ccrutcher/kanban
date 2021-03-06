import React from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './Components/Landing'
import Board from './Components/Board'

export default function App() {
  return (
    <Router>
      <div id="App">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
        <Route exact path="/board/:boardId">
            <Board />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}