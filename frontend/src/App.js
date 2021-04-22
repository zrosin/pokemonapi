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

  const [pokeDexNum, setPokeDexNum] = useState(0);
  const [pokeName1, setPokeName1] = useState("");

  useEffect (() => {
    if(pokeDexNum > 0) {
      async function getPokeDexNumber() {
        const response = await fetch(`api/pokemon/pokedex/${pokeDexNum}`).then((r) => r.json());
        console.log(response.name);
        let typeList = "";
        for (let type of response.types) {
          if (response.types.indexOf(type) == response.types.length - 1) {
            typeList += type;
          }
          else {
            typeList += type + ", ";
          }
        }
        let abilityList = "";
        for (let ability of response.abilities) {
          if (response.abilities.indexOf(ability) == response.abilities.length - 1) {
            abilityList += ability;
          }
          else {
            abilityList += ability + ", ";
          }
        }
        setPokeName1(
          <div>
            <h1>{response.name}</h1>
            <ul>
              <li>Pokedex Number:{response.pokedexNumber}</li><br></br>
              <li>Height (m): {response.height}</li><br></br>
              <li>Weight (kg): {response.weight}</li><br></br>
              <li>Types: {typeList}</li><br></br>
              <li>Abilities: {abilityList}</li><br></br>
            </ul>
          </div>);
      }
      getPokeDexNumber();
    }
    else {
      setPokeName1("");
    }
  }, [pokeDexNum]);

  return(
    <>
      <div>
        <input onChange={e => setPokeDexNum(e.target.value)} type="number" id="pokeDexNum "name="pokeDexNum" min={1} max={151} value={pokeDexNum}></input>
      </div>
      <div>
        <p>{pokeName1}</p>
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
