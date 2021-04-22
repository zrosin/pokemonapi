//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import React, { useState } from 'react';
/* function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App; */


function Navbar() {
  return (
    <ul>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/widgets">Widgets</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}

function App() {
    return (
      <Router>
        <Navbar></Navbar>
        <Switch>     
          <Route path="/about">
            <About />
          </Route>
	      </Switch>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route path="/widgets">
            <Widgets />
          </Route>
        </Switch>      
	    </Router>);
}

function About() {
  return(
    <div>
      <p>This is another test</p>
    </div>
  );
}

function Widgets() {
  return(
    <div>
      <p>This is an extra test</p>
    </div>
  );
}

function Home() {
  return(
    <div>
      <p>This is a test</p>
    </div>
  );
}

export default App;