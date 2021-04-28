// modify.js -- all of the components for updating/deleting/creating pokemon.
// since we don't know how much of this functionality we will use, it is hidden for now.

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import { formatAbilities } from "./DetailedPokemon"


export function PostPokemon() {
    const [IsPosted, setIsPosted] = useState(false);
    const [pokeDexNum1, setPokeDexNum1] = useState(0);
    const [pokeName, setPokeName] = useState("");
    const [pokeHeight, setPokeHeight] = useState(0);
    const [pokeWeight, setPokeWeight] = useState(0);
    const [pokeType1, setPokeType1] = useState("");
    const [pokeType2, setPokeType2] = useState("");
    const [pokeAbilities, setPokeAbilities] = useState("");

    useEffect(() => {
        if (IsPosted === true) {
            async function postPokemon() {
                console.log("bingo");
                if (pokeDexNum1 !== 0 && pokeName !== "" && pokeHeight !== 0 && pokeWeight !== 0 && pokeType1 !== "" && pokeAbilities !== "") {
                    let typeList = [];
                    let abilityList = pokeAbilities.split(",");
                    typeList.push(pokeType1);
                    if (pokeType1 !== pokeType2) {
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


    return (
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
export function DeletePokemon(props) {
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
            if (isPressed) {
                async function deletePokemon() {
                    const response = await fetch(`/api/pokemon/id/${id}`, { method: "DELETE" });
                    if (response.status === 204) {
                        alert(`Deleted object with objectID = ${id}`);
                    }
                    else if (response.status === 400) {
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
        if (id !== "") {
            for (let i of possibleIds) {
                if (i._id === id) {
                    deletePokemon =
                        <button onClick={() => setIsPressed(true)}>Delete {i.name}</button>;
                }
            }
        }
        return (deletePokemon);
    }

    return (
        <>
            <h4>Delete By ID</h4>
            <select key={id} value={id} onChange={(e) => { setID(e.target.value) }}>
                <option key={1} value={""}>Select a Mystery Pokemon</option>
                {options}
            </select>
            <IDInfo />
        </>
    );
}

export function UpdatePokemon(props) {
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

        useEffect(() => {
            if (IsUpdated) {
                async function putPokemon() {
                    if (PokeDexNum !== 0 && PokeName !== "" && PokeHeight !== 0 && PokeWeight !== 0 && PokeType1 !== "" && PokeAbilities !== "") {
                        let typeList = [];
                        let abilityList = PokeAbilities.split(',');
                        typeList.push(PokeType1);
                        if (PokeType1 !== PokeType2) {
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
        if (id !== "") {
            for (let i of possibleIds) {
                if (i._id === id) {
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
                                    <Form.Control as="input" onChange={e => setPokeName(e.target.value)} type="text" value={PokeName} />
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
        return (
            selectedForm
        );
    }

    const options = possibleIds.map((i) => (
        <option key={i._id} value={i._id}>Object {i._id}</option>
    ));

    return (
        <>
            <div className="PutOptions">
                <Form>
                    <Form.Group>
                        <Form.Label><h4>Update By ID</h4></Form.Label>
                        <Form.Control as="select" key={id} value={id} onChange={(e) => { setID(e.target.value) }}>
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