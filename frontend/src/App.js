//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useParams  } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

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


function Navigation() {
  return (
  <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link href="/pokemon">Main Page</Nav.Link>
      <Nav.Link href="/updatepokemon">Update Pokemon</Nav.Link>
      <Nav.Link href="/getpokemon">Get Pokemon</Nav.Link>
      <Nav.Link href="/postpokemon">Post Pokemon</Nav.Link>
      <Nav.Link href="/deletepokemon">Delete Pokemon</Nav.Link>
    </Nav>
  </Navbar>
  );
}

function App() {
    return (
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route exact path="/pokemon">
            <GetPokemonForMainPage/>
          </Route>
        </Switch>
        <Switch>     
          <Route path="/getpokemon">
            <GetPokemonOnDexNum/>
            <GetPokemonOnType /><br />
            <GetPokemonOnID mons={5}/>
            <GetAllPokemon />
          </Route>
        </Switch>
        <Switch>
          <Route path="/updatepokemon">
            <UpdatePokemon mons={5}/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/postpokemon">
            <PostPokemon />
          </Route>
        </Switch>
        <Switch>
          <Route path="/deletepokemon">
            <DeletePokemon mons={5}/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/pokemon/:dexNum">
            <DetailedPokemon />
          </Route>
        </Switch>       
      </Router>);
}

function checkNull(ability) {
  return ability !== null;
}

function DetailedPokemon() {
  const params = useParams();
  const [DetailedInfo, setDetailedInfo] = useState("");

  useEffect (() => {
    if(DetailedInfo === "") {
      async function getDetails() {
        const response = await fetch(`../api/pokemon/pokedex/${params.dexNum}`).then((r) => r.json());
        if (!('message' in response)) {
          let typeList = response.types[1] == null ? response.types[0] : response.types[0] + ", " + response.types[1];
          let initialAbilityList = response.abilities.filter(checkNull);
          let abilityList = "";
          for (let ability of initialAbilityList) {
            if(initialAbilityList.indexOf(ability) === (initialAbilityList.length - 1)) {
              abilityList += ability;
            }
            else {
              abilityList += (ability + ", ");
            }
          }
          setDetailedInfo(
            <div>
              <h1>{response.name}</h1>
              <img src={response.imgurl} alt=" "width="400" height="400" />
              <ul>
                <li><h4>Pokedex Number: {response.pokedexNumber}</h4></li><br />
                <li><h4>Height (m): {response.height}</h4></li><br />
                <li><h4>Weight (kg): {response.weight}</h4></li><br />
                <li><h4>Types: {typeList}</h4></li><br />
                <li><h4>Abilities: {abilityList}</h4></li><br />
                <p>
                  <b>{response.flavorText}</b>
                </p>
                <Table>
                  <thead>
                    <tr>
                      <th>HP</th>
                      <th>Attack</th>
                      <th>Defense</th>
                      <th>Special Attack</th>
                      <th>Special Defense</th>
                      <th>Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{response.hp}</td>
                      <td>{response.attack}</td>
                      <td>{response.defense}</td>
                      <td>{response.specialAttack}</td>
                      <td>{response.specialDefense}</td>
                      <td>{response.speed}</td>
                    </tr>
                  </tbody>
                </Table>
              </ul>
            </div>);
        }
      }
      getDetails();
    }
  });

  return(
    <div>
      {DetailedInfo}
    </div>
  );
}

function GetPokemonOnDexNum() {

  const [pokeDexNum, setPokeDexNum] = useState(0);
  const [dexInfo, setdexInfo] = useState("");

  useEffect (() => {
    if(pokeDexNum > 0) {
      async function getPokeDexNumber() {
        const response = await fetch(`api/pokemon/pokedex/${pokeDexNum}`).then((r) => r.json());
        if (!('message' in response)) {
          let typeList = response.types[1] === null ? response.types[0] : response.types[0] + ", " + response.types[1];
          let abilityList = formatAbilities(response.abilities);
          console.log(response.img);
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
              <img src={response.imgurl} alt=" "width="150" height="150" />
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
        <Form>
          <Form.Group>
            <Form.Label><h4>Get By Dex Number!</h4></Form.Label>
            <Form.Control as="input" onChange={e => setPokeDexNum(e.target.value)} type="number" min={1} max={151} value={pokeDexNum} />
          </Form.Group>
        </Form>
      </div>
      <div>
        {dexInfo}
      </div>
    </>  
  );
}

function formatAbilities(abilityList) {
  let initialAbilityList = abilityList.filter(checkNull);
  let formattedList = "";
  for(let ability of initialAbilityList) {
    if(initialAbilityList.indexOf(ability) === (initialAbilityList.length - 1)) {
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
    else {
      setInitialInfo("");
    }
  }, [pokeType]);


  function TypeInfo() {
    let tableOfPokemon;
    if(initialInfo.length !== 0) {
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
        <Table striped bordered hover size="sm" key={123}>
          <tbody>
            {tableOfPokemon}
          </tbody>
        </Table>
      </div>
    );
  }

  return(
    <>
      <div>
        <Form>
          <Form.Group>
            <Form.Label><h4>Get By Type!</h4></Form.Label>
            <Form.Control as="select" onChange={e => setPokeType(e.target.value)}>
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
            </Form.Control>
          </Form.Group>
        </Form>
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
              <li>Pokedex Number: {i.pokedexNumber}</li><br />
              <li>Weight: {i.weight}</li><br />
              <li>Height: {i.height}</li><br />
              <li>Type(s): {i.types[1] === null ? i.types[0] : i.types[0] + ", " + i.types[1]}</li><br />
              <li>Abilities: {formatAbilities(i.abilities)}</li><br />
            </ul>
            <img src={i.imgurl} alt=" "width="150" height="150" />
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
      <Form>
        <Form.Group>
          <Form.Label><h4>Get By ID!</h4></Form.Label>
          <Form.Control as="select" key={id} value={id} onChange={(e) => {setID(e.target.value)}}>
            <option key={1} value={""}>Select a Mystery Pokemon</option>
            {options}
          </Form.Control>
        </Form.Group>
      </Form>
        <IDInfo />
    </>
  )
}

function GetPokemonForMainPage() {
  const [initialInfo, setInitialInfo] = useState([]);
  
  
  useEffect(() => {
    async function getAllPokemon() {
      setInitialInfo("")
      let response = await fetch("/api/pokemon/").then(r => r.json());
      let result = response;
      setInitialInfo(result);
    }
    getAllPokemon();
  }, []);

  function AllPokemon() {
    let PokemonDivs;
    if(initialInfo.length !== 0) {
      PokemonDivs = initialInfo.map((entry) => (
          <div key={entry.pokedexNumber} className="PokemonElement">
            <a href={"/pokemon/" + entry.pokedexNumber}>
              <img src={entry.imgurl} alt={entry.name + " image"} />
              <h4>{entry.name}</h4>
              <h8>#{entry.pokedexNumber}</h8>
            </a>
          </div>
        
      ));
    }
    console.log(PokemonDivs);
    return ( 
      <span className="MainPageList">
        {PokemonDivs} 
      </span>
      );
  }

  
  return (
        <AllPokemon />
  );
  
}



function GetAllPokemon() {
  const [showPressed, setShowPressed] = useState(false);
  const [initialInfo, setInitialInfo] = useState([]);

  useEffect(() => {
    if(showPressed) {
      async function getAllPokemon() {
        let response = await fetch("/api/pokemon/").then(r => r.json());
        let result = response;
        setInitialInfo(result);
      }
      getAllPokemon();
    }
    else {
      setInitialInfo("");
    }
  }, [showPressed]);

  function AllInfo() {
    let tableOfPokemon;
    if(initialInfo.length !== 0) {
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
        <Table striped bordered hover size="sm" key={123}>
          <tbody>
            {tableOfPokemon}
          </tbody>
        </Table>
      </div>
    );
  }

  return (
    <>
      <div>
        <h4>Get all Pokemon!</h4>
        <Button as="input" type="button" onClick={() => setShowPressed(true)} value="Get all pokemon"/>&nbsp;&nbsp;
        <Button as="input" type="button" onClick={() => setShowPressed(false)} value="Hide"/>
      </div>
      <div>
        <AllInfo />
      </div>
    </>
  );
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
    if(IsPosted === true) {
      async function postPokemon() {
        console.log("bingo");
        if(pokeDexNum1 !== 0 && pokeName !== "" && pokeHeight !== 0 && pokeWeight !== 0 && pokeType1 !== "" && pokeAbilities !== "") {
          let typeList = [];
          let abilityList = pokeAbilities.split(",");
          typeList.push(pokeType1);
          if(pokeType1 !== pokeType2) {
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
    <div className="PostMenu">
        <h1>Add Pokemon</h1>
        <Form onSubmit={() => setIsPosted(true)}>
          <Form.Row>
            <Form.Group>
              <Form.Label>Pokedex Number:</Form.Label>
              <Form.Control as="input" onChange={e => setPokeDexNum1(e.target.value)} type="number" value={pokeDexNum1} />
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>Pokemon Name:</Form.Label>
              <Form.Control as="input" onChange={e => setPokeName(e.target.value)} type="text" value={pokeName} />
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>Pokemon Height:</Form.Label>
              <Form.Control as="input" onChange={e => setPokeHeight(e.target.value)} type="number" value={pokeHeight} />
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>Pokemon Weight:</Form.Label>
              <Form.Control as="input" onChange={e => setPokeWeight(e.target.value)} type="number" value={pokeWeight} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Form.Label>Type 1:</Form.Label>
              <Form.Control as="select" onChange={e => setPokeType1(e.target.value)}>
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
              </Form.Control>
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>Type 2:</Form.Label>
              <Form.Control as="select" onChange={e => setPokeType2(e.target.value)}>
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
              </Form.Control>
            </Form.Group>
            &nbsp;&nbsp;&nbsp;
            <Form.Group>
              <Form.Label>Pokemon Abilities (separated by commas, please): </Form.Label>
              <Form.Control as="input" onChange={e => setPokeAbilities(e.target.value)} type="text" value={pokeAbilities} />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" type="submit">
            Create Pokemon
          </Button>
        </Form>
    </div>
  );
}

function UpdatePokemon(props) {
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

  function IDForm() {
    const [IsUpdated, setIsUpdated] = useState(false);
    const [PokeDexNum, setPokeDexNum] = useState(0);
    const [PokeName, setPokeName] = useState("");
    const [PokeHeight, setPokeHeight] = useState(0);
    const [PokeWeight, setPokeWeight] = useState(0);
    const [PokeType1, setPokeType1] = useState("");
    const [PokeType2, setPokeType2] = useState("");
    const [PokeAbilities, setPokeAbilities] = useState("");

    useEffect (() => {
      if(IsUpdated) {
        async function putPokemon() {
          if(PokeDexNum !== 0 && PokeName !== "" && PokeHeight !== 0 && PokeWeight !== 0 && PokeType1 !== "" && PokeAbilities !== "") {
            let typeList = [];
            let abilityList = PokeAbilities.split(',');
            typeList.push(PokeType1);
            if(PokeType1 !== PokeType2) {
              typeList.push(PokeType2);
            }
            let updatedPokemon = {};
            updatedPokemon._id = id;
            updatedPokemon.pokedexNumber = PokeDexNum;
            updatedPokemon.name = PokeName;
            updatedPokemon.height = PokeHeight;
            updatedPokemon.weight = PokeWeight;
            updatedPokemon.types = typeList;
            updatedPokemon.abilities = abilityList;
            let response = await fetch(`/api/pokemon/id/${updatedPokemon._id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: (JSON.stringify(updatedPokemon))
            });
            if (!('message' in response)) {
              alert("Pokemon with ID " + updatedPokemon._id + " was successfully updated!");
            }
            setIsUpdated(false);
          }
          else {
            alert("You missed a field!");
          }
        }
        putPokemon();
      }
    }, [IsUpdated, PokeAbilities, PokeDexNum, PokeHeight, PokeName, PokeType1, PokeType2, PokeWeight]);

    let selectedForm = "";
    if(id !== "") {
      for(let i of possibleIds) {
        if(i._id === id) {
          selectedForm = 
          <Form onSubmit={() => setIsUpdated(true)}>
            <Form.Row>
              <Form.Group>
                <Form.Label>Pokedex Number - Was {i.pokedexNumber}: </Form.Label>
                <Form.Control as="input" onChange={e => setPokeDexNum(e.target.value)} type="number" min={1} max={151} value={PokeDexNum} />
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group>
                <Form.Label>Pokemon Name - Was {i.name}: </Form.Label>
                <Form.Control as="input" onChange={e => setPokeName(e.target.value)} type="text"value={PokeName} />
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group>
                <Form.Label>Pokemon Height - Was {i.height}: </Form.Label>
                <Form.Control as="input" onChange={e => setPokeHeight(e.target.value)} type="number" step=".1" value={PokeHeight} />
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group>
                <Form.Label>Pokemon Weight - Was {i.weight}: </Form.Label>
                <Form.Control as="input" onChange={e => setPokeWeight(e.target.value)} type="number" step=".1" value={PokeWeight} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <Form.Label>Type(s) - were {i.types[1] == null ? i.types[0] : i.types[0] + ", " + i.types[1]}: </Form.Label>
                  <Form.Control as="select" onChange={e => setPokeType1(e.target.value)}>
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
                  </Form.Control>
                </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group>
                <Form.Label>&nbsp; </Form.Label>
                <Form.Control as="select" onChange={e => setPokeType2(e.target.value)}>
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
                </Form.Control>
              </Form.Group>
              &nbsp;&nbsp;&nbsp;
              <Form.Group>
                <Form.Label>Pokemon Abilities (separated by commas, please) - Was {formatAbilities(i.abilities)}: </Form.Label>
                <Form.Control as="input" onChange={e => setPokeAbilities(e.target.value)} type="text" value={PokeAbilities} />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Update Pokemon
            </Button>
          </Form>
        }
      }
    }
    return(
      selectedForm
    );
  }

  const options = possibleIds.map((i) => (
    <option key={i._id} value={i._id}>Object {i._id}</option>
  ));
  
  return(
    <>
      <div className="PutOptions">
        <Form>
          <Form.Group>
            <Form.Label><h4>Update By ID</h4></Form.Label>
            <Form.Control as="select" key={id} value={id} onChange={(e) => {setID(e.target.value)}}>
              <option key={1} value={""}>Select a Mystery Pokemon</option>
              {options}
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
      <div className="PutMenu">
        <IDForm />
      </div>
    </>
  );
}

function DeletePokemon(props) {
  const [id, setID] = useState("");
  const [possibleIds, setPossibleIds] = useState([]);
  const [isPressed, setIsPressed] = useState(false);

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

  const options = possibleIds.map((i) => (
    <option key={i._id} value={i._id}>Object {i._id}</option>
  ));

  function IDInfo() {

    useEffect(() => {
      if(isPressed) {
        async function deletePokemon() {
          const response = await fetch(`/api/pokemon/id/${id}`, {method: "DELETE"});
          if (response.status === 204) {
            alert(`Deleted object with objectID = ${id}`);
        }
        else if(response.status === 400) {
            alert("Deletion failed. Try it again?");
        }
        else {
            // it was a 404.
            alert("Couldn't find the Pokémon with that object ID. Did you already delete it?");
        }
          setIsPressed(false);
        }
        deletePokemon();
      }
    });
    let deletePokemon = "";
    if(id !== "") {
      for(let i of possibleIds) {
        if(i._id === id) {
          deletePokemon =
              <button onClick={() => setIsPressed(true)}>Delete {i.name}</button>;
        }
      }
    }
    return(deletePokemon);
  }

  return(
    <>
      <h4>Delete By ID</h4>
      <select key={id} value={id} onChange={(e) => {setID(e.target.value)}}>
        <option key={1} value={""}>Select a Mystery Pokemon</option>
        {options}
      </select>
        <IDInfo />
    </>
  );
}

export default App;
