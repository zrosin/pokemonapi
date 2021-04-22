//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
        <Link to="/getpokemon">Get Pokemon</Link>
      </li>
    </ul>
  );
}

function App() {
    return (
      <Router>
        <Navbar></Navbar>
        <Switch>     
          <Route path="/getpokemon">
            <GetPokemon />
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

function GetPokemon() {

  const [pokeDexNum, setPokeDexNum] = useState(1);
  const [pokeName, setPokeName] = useState("");
  const [dexNumQuery, setDexNumQuery] = useState("");

  useEffect (() => {
    if(dexNumQuery !== "") {
      console.log(dexNumQuery);
      async function getPokeDexNumber() {
        const response = await fetch(`api/pokemon/pokedex/${dexNumQuery}`).then((r) => r.json());
        console.log(response.name);
        setPokeName(response.name);
      }
      getPokeDexNumber();
    }
  });

  return(
    <>
      <div>
        <input onChange={e => setPokeDexNum(e.target.value)} type="number" id="pokeDexNum "name="pokeDexNum" min={1} max={151}></input>
        <button onClick={() => setDexNumQuery(pokeDexNum)}type="submit" name="getPokemon" value="Submit">Find</button>
      </div>
      <div>
        <p>{pokeName}</p>
      </div>
    </>  
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
