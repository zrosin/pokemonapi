//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
        <Link to="/updatepokemon">Update Pokemon</Link>
      </li>
      <li>
        <Link to="/postpokemon">Post Pokemon</Link>
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
            <GetPokemonOnDexNum />
            <GetPokemonOnType /><br />
            <GetPokemonOnID mons={5}/>
          </Route>
	      </Switch>
        <Switch>
          <Route path="/updatepokemon">
            <UpdatePokemon />
          </Route>
        </Switch>
        <Switch>
          <Route path="/postpokemon">
            <PostPokemon />
          </Route>
        </Switch>      
	    </Router>);
}

function GetPokemonOnDexNum() {

  const [pokeDexNum, setPokeDexNum] = useState(0);
  const [dexInfo, setdexInfo] = useState("");

  useEffect (() => {
    if(pokeDexNum > 0) {
      async function getPokeDexNumber() {
        console.log("test");
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
          
          setdexInfo(
            <div>
              <h1>{response.name}</h1>
              <ul>
                <li>Pokedex Number:{response.pokedexNumber}</li><br />
                <li>Height (m): {response.height}</li><br />
                <li>Weight (kg): {response.weight}</li><br />
                <li>Types: {typeList}</li><br />
                <li>Abilities: {abilityList}</li><br />
              </ul>
            </div>);
        }
      }
      getPokeDexNumber();
    }
    else {
      setdexInfo("");
    }
  }, [pokeDexNum]);
  return(
    <>
      <div>
        <h4>Get By Dex Number!</h4>
        <input onChange={e => setPokeDexNum(e.target.value)} type="number" min={1} max={151} value={pokeDexNum}></input>
      </div>
      <div>
        {dexInfo}
      </div>
    </>  
  );
}

function formatAbilities(abilityList) {
  let formattedList = "";
  for(let ability of abilityList) {
    if(abilityList.indexOf(ability) == abilityList.length - 1) {
      formattedList += ability;
    }
    else {
      formattedList += (ability + ", ");
    }
  }
  return formattedList;
}

function GetPokemonOnType () {
  const [pokeType, setPokeType] = useState("");
  const [initialInfo, setInitialInfo] = useState([]);

  useEffect(() => {
    if(pokeType !== "") {
      async function getPokemonOnType() {
        const response = await fetch(`/api/pokemon/type/${pokeType}`).then((r) => r.json());
        let result = response;
        setInitialInfo(result);
      }
      getPokemonOnType();
    }
  }, [pokeType]);


  function TypeInfo() {
    let tableOfPokemon;
    if(initialInfo.length != 0) {
      tableOfPokemon = initialInfo.map((entry) => (
        <tr key={entry._id} >
          <td>{entry.pokedexNumber}</td>
          <td>{entry.name}</td>
          <td>{entry.weight}</td>
          <td>{entry.height}</td>
          <td>{entry.types[1] == null ? entry.types[0] : entry.types[0]  + ", " + entry.types[1]}</td>
          <td>{formatAbilities(entry.abilities)}</td>
        </tr>
      ));
      tableOfPokemon.unshift(<tr key={1}><th>Pokédex Number</th><th>Name</th><th>Height (m)</th><th>Weight</th><th>Type(s)</th><th>Abilities</th></tr>);
    }
    return (
      <div>
        <table key={123}>
          <tbody>
            {tableOfPokemon}
          </tbody>
        </table>
      </div>
    );
  }

  return(
    <>
      <div>
        <h4>Get By Type!</h4>
        <select onChange={e => setPokeType(e.target.value)}>
          <option value="">Select a type!</option>
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
      <div>
        <TypeInfo />
      </div>
    </>
  );
}

function GetPokemonOnID(props) {
  const [id, setID] = useState("");
  const [possibleIds, setPossibleIds] = useState([]);
  useEffect(() => {
    async function getMons() {
      const dexNumbers = Array(props.mons).fill(0).map(() => (Math.floor(Math.random() * 151) + 1));
      const pokemon = await Promise.all(dexNumbers.map(async i => {
        let r = await fetch(`/api/pokemon/pokedex/${i}`);
        if (r.ok) {
          let value = await r.json();
          return value
        }
        else {
          // someone deleted one of these.
          return null
        }
      }));
     setPossibleIds(pokemon);
    }
    getMons();
  }, [props.mons]);

  function IDInfo() {
    let selectedPokemon = "";
    if(id !== "") {
      for(let i of possibleIds) {
        if(i._id === id) {
          selectedPokemon =
          <div>
            <h1>{i.name}</h1>
            <ul>
              <li>Pokedex Number: {i.pokedexNumber}</li>
              <li>Weight: {i.weight}</li>
              <li>Height: {i.height}</li>
              <li>Type(s): {i.types.length == 1 ? i.types[0] : i.types[0] + ", " + i.types[1]}</li>
              <li>Abilities: {formatAbilities(i.abilities)}</li>
            </ul>
          </div>;
        }
      }
    }
    return(selectedPokemon);
  }

  const options = possibleIds.map((i) => (
    <option key={i._id} value={i._id}>Object {i._id}</option>
  ));
  return (
    <>
      <h4>Get By ID!</h4>
      <select key={id} value={id} onChange={(e) => {setID(e.target.value)}}>
        <option key={1} value={""}>Select a Mystery Pokemon</option>
        {options}
      </select>
        <IDInfo />
    </>
  )
}

function PostPokemon() {
  const [IsPosted, setIsPosted] = useState(false);
  const [pokeDexNum1, setPokeDexNum1] = useState(0);
  const [pokeName, setPokeName] = useState("");
  const [pokeHeight, setPokeHeight] = useState(0);
  const [pokeWeight, setPokeWeight] = useState(0);
  const [pokeType1, setPokeType1] = useState("");
  const [pokeType2, setPokeType2] = useState("");
  const [pokeAbilities, setPokeAbilities] = useState("");

  useEffect (() => {
    if(IsPosted == true) {
      console.log("bingo");
      async function postPokemon() {
        if(pokeDexNum1 !== 0 && pokeName !== "" && pokeHeight !== 0 && pokeWeight !== 0 && pokeType1 !== "" && pokeAbilities !== "") {
          console.log("bingo");
          let typeList = [];
          let abilityList = pokeAbilities.split(",");
          typeList.push(pokeType1);
          if(pokeType1 != pokeType2) {
            typeList.push(pokeType2);
          }
          let newPokemon = {};
          newPokemon.pokedexNumber = pokeDexNum1;
          newPokemon.name = pokeName;
          newPokemon.height = pokeHeight;
          newPokemon.weight = pokeWeight;
          newPokemon.types = typeList;
          newPokemon.abilities = abilityList;
          let response = await fetch("/api/pokemon/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: (JSON.stringify(newPokemon))
          }).then(r => r.json());
          if (!('message' in response)) {
            alert(newPokemon.name + " was successfully added!");
          }
          setIsPosted(false);
        }
        else {
          alert("You missed a field! Try again!");
        }
      }
      postPokemon();
    }
  }, [IsPosted, pokeDexNum1, pokeName, pokeHeight, pokeWeight, pokeType1, pokeType2, pokeAbilities]);

  return(
    <div>
      <h2>Add a Pokemon</h2>
      <div>
        <form onSubmit={() => setIsPosted(true)}>
          <label>
            Pokedex Number:
            <input onChange={e => setPokeDexNum1(e.target.value)} type="number" value={pokeDexNum1}></input>
          </label><br /><br />
          <label>
            Name:
            <input onChange={e => setPokeName(e.target.value)} type="text" value={pokeName}></input>
          </label><br /><br />
          <label>
            Height (m):
            <input onChange={e => setPokeHeight(e.target.value)} type="number" value={pokeHeight}></input>
          </label><br /><br />
          <label>
            Weight (kg):
            <input onChange={e => setPokeWeight(e.target.value)} type="number" value={pokeWeight}></input>
          </label><br /><br />
          <label>
            Type(s):
            <select onChange={e => setPokeType1(e.target.value)}>
              <option value="">Type 1</option>
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
            <select onChange={e => setPokeType2(e.target.value)}>
              <option value="">Type 2</option>
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
          </label><br /><br />
          <label>
            Abilities (separated by commas, please):
            <input onChange={e => setPokeAbilities(e.target.value)} type="text" value={pokeAbilities}></input>
          </label><br /><br />
          <input type="submit" value="Add Pokemon"/>
        </form>
    </div>
  </div>
  );
}

function UpdatePokemon() {
  const [isPressed, setIsPressed] = useState(false);
  const [pokeID, setPokeID] = useState("");
  const [pokeMenu, setPokeMenu] = useState("");

  return(
    <>
      <div>
      </div>
    </>
  );
}

export default App;
