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
        <Link to="/">Home</Link>
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

  function About() {
    return (
      <div>
        <h1>About</h1>
        <p>This is a test.</p>
      </div>
    );
  }

  function Homepage() {
    return (
      <div>
        <h1>Homepage</h1>
        <p>This is another test</p>
      </div>
    );
  }

  function NotFound() {
    return (
      <div>
        <h1>About</h1>
        <p>This is also test</p>
      </div>
    );
  }

  return (
    <Router>
      <Navbar></Navbar>
      <Switch>     
        <Route path="/about/:option" children={<About />} />
          <About />
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
	  </Switch>   
	</Router>

  );
}

export default App;
