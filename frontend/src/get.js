// get.js -- ports of vanilla JS get widgets.
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import Button from 'react-boostrap/Button'
import {formatAbilities} from './DetailedPokemon'

export function GetPokemonOnDexNum() {

    const [pokeDexNum, setPokeDexNum] = useState(0);
    const [dexInfo, setdexInfo] = useState("");

    useEffect(() => {
        if (pokeDexNum > 0) {
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
                            <img src={response.imgurl} alt=" " width="150" height="150" />
                        </div>);
                }
            }
            getPokeDexNumber();
        }
        else {
            setdexInfo("");
        }
    }, [pokeDexNum]);
    return (
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

export function GetPokemonOnType() {
    const [pokeType, setPokeType] = useState("");
    const [initialInfo, setInitialInfo] = useState([]);

    useEffect(() => {
        if (pokeType !== "") {
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
        if (initialInfo.length !== 0) {
            tableOfPokemon = initialInfo.map((entry) => (
                <tr key={entry._id} >
                    <td>{entry.pokedexNumber}</td>
                    <td>{entry.name}</td>
                    <td>{entry.weight}</td>
                    <td>{entry.height}</td>
                    <td>{entry.types[1] == null ? entry.types[0] : entry.types[0] + ", " + entry.types[1]}</td>
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

export function GetPokemonOnID(props) {
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
        if (id !== "") {
            for (let i of possibleIds) {
                if (i._id === id) {
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
                            <img src={i.imgurl} alt=" " width="150" height="150" />
                        </div>;
                }
            }
        }
        return (selectedPokemon);
    }

    const options = possibleIds.map((i) => (
        <option key={i._id} value={i._id}>Object {i._id}</option>
    ));
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label><h4>Get By ID!</h4></Form.Label>
                    <Form.Control as="select" key={id} value={id} onChange={(e) => { setID(e.target.value) }}>
                        <option key={1} value={""}>Select a Mystery Pokemon</option>
                        {options}
                    </Form.Control>
                </Form.Group>
            </Form>
            <IDInfo />
        </>
    )
}

export function GetAllPokemon() {
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