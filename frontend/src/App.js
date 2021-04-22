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
  const [pokeInfo1, setPokeInfo1] = useState("");
  const [pokeType, setPokeType] = useState("");

  useEffect (() => {
    if(pokeDexNum > 0) {
      async function getPokeDexNumber() {
        const response = await fetch(`api/pokemon/pokedex/${pokeDexNum}`).then((r) => r.json());
        if (!('message' in response)) {
          let typeList = "";
          for (let type of response.types) {
            if (type !== "null") {
              if (response.types.indexOf(type) == response.types.length - 1) {
                typeList += type;
              }
              else {
                typeList += type + ", ";
              }
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
          setPokeInfo1(
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
      }
      getPokeDexNumber();
    }
    else {
      setPokeInfo1("");
    }
    if(pokeType !== "") {
      async function getPokeTypes() {
        const response = await fetch(`/api/pokemon/type/${pokeType}`).then((r) => r.json());
        if (!('message' in response)) {
          let text = "<tr><th>Pokédex Number</th><th>Name</th><th>Height (m)</th><th>Weight</th><th>Type(s)</th><th>Abilities</th></tr><tr>"
          for (let pokemon of response) {
            text += "<tr><td>" + pokemon.name + "</td>";
            text += "<td>" + pokemon.pokedexNumber + "</td>";
            text += "<td>" + pokemon.height + "</td>";
            text += "<td>" + pokemon.weight + "</td>";
            if(pokemon.types[1] == null) {
                text += "<td>" + pokemon.types[0] + "</td>";
            }
            else {
              text += "<td>" + pokemon.types[0] + ", " + pokemon.types[1] + "</td>";
            }
            text += "<td>";
            for (let ability of pokemon.abilities) {
              if(pokemon.abilities.indexOf(ability) == pokemon.abilities.length - 1) {
                text += ability + "</td></tr>";
              }
              else {
                text += ability + ", ";
              }
            }
          }
          document.getElementById("test").innerHTML = "<table><tbody>" + text + "</tbody></table>";
        }
      }
      getPokeTypes();
    }
    else {
      document.getElementById("test").innerHTML = "";
    }
  }, [pokeDexNum, pokeType]);

  return(
    <>
      <div>
        <input onChange={e => setPokeDexNum(e.target.value)} type="number" min={1} max={151} value={pokeDexNum}></input>
      </div>
      <div>
        <p>{pokeInfo1}</p>
      </div>
      <div>
      <select onChange={e => setPokeType(e.target.value)}>
          <option value="">Select a Pokemon Type</option>
          <option value="grass">Grass</option>
          <option value="water">Water</option>
          <option value="fire">Fire</option>
          <option value="poison">Poison</option>
          <option value="flying">Flying</option>
          <option value="rock">Rock</option>
          <option value="ground">Ground</option>
          <option value="electric">Electric</option>
          <option value="ghost">Ghost</option>
          <option value="dark">Dark</option>
          <option value="bug">Bug</option>
          <option value="steel">Steel</option>
          <option value="normal">Normal</option>
          <option value="psychic">Psychic</option>
          <option value="fighting">Fighting</option>
          <option value="fairy">Fairy</option>
          <option value="dragon">Dragon</option>
          <option value="ice">Ice</option>
        </select>
      </div>
      <div id="test">
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
