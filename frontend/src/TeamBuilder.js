import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { checkNull } from './App';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

//This function sends a proper request for an image with the authentication header.
function Image(props) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if(imageUrl === "") {
      async function getImage() {
        const src = props.url;
        const options = {
        headers: {
          'x-auth': sessionStorage.getItem("jwt")
          }
        };

        const imageRes = await fetch(src, options)
          .then(res => res.blob())
          .then(blob => {
            setImageUrl(URL.createObjectURL(blob));
        });
      }
      getImage();
    }
  });

  return(
    <img className="team_image" src={imageUrl} alt={props.alt} />
  );
}



export function TeamBuilder() {
    const [pokemonSelected, setPokemon] = useState([]);
    const [analysis, setAnalysis] = useState("");
    const [runAnalysis, addRunAnalysis] = useState(0);
    const [selectedPoke, setSelectedPokemon] = useState(null);
    const [loadedPoke, setLoadedPoke] = useState(null);
    const [DetailedInfo, setDetailedInfo] = useState("");
    const [moves, changeMove] = useState([]);
    const [newPokemon, changeNewPokemon] = useState(null);
    const [pokeList, changePokeList] = useState(null);
    const [moveList, changeMoveList] = useState([]);

    

    
    
    //pokemonSelected needs to be a default mon that just has no info or something.

    useEffect(() => {
        async function getTeamPokemon() {
          let token = sessionStorage.getItem("jwt");
          let response = await fetch("/api/team/", {
            headers: { "x-auth": token }}).then(r => r.json());
          let result = response;
          setPokemon(result.comp);
        }
        
        getTeamPokemon();
    }, []);

    function TeamDisplay() {
        let Team = "";

        if (pokemonSelected) {
            
            //Rerenders pokemon on button press
            Team = pokemonSelected.map((poke) => (
                <Button id={poke.pokedexNum} variant="outline-primary" className="team_builder_pokemon_button" onClick={(e) => {setSelectedPokemon(poke); e.preventDefault();}}>
                    <div id={poke.pokedexNum} className="team_builder_pokemon">
                        <div>
                            <Image  url={poke.pokemon.imgurl} alt={poke.pokemon.name + "image"} />
                        </div>
                        
                        <div className="team_builder_pokemon_info">
                            <h6>{poke.pokemon.name}</h6>
                            <p>HP: {poke.pokemon.hp}</p>
                            <p>Attack: {poke.pokemon.attack}</p>
                            <p>Defense: {poke.pokemon.defense}</p>
                        </div>
                    </div>
                </Button>
            ));
        }

        return (
            Team
        );
    }

    useEffect(() => {
        async function getPokeList() {
            let token = sessionStorage.getItem("jwt");
              let response = await fetch("/api/pokemon/names/", {
                headers: { "x-auth": token }}).then(r => r.json());
              let result = response;
              changePokeList(result);
            }
        getPokeList();
    }, []);

    

    function PokeCard() {

        useEffect(() => {
            
            async function getMoveList() {
                let token = sessionStorage.getItem("jwt");
                let response = await fetch("/api/pokemon/moveset/" + selectedPoke.pokemon.pokedexNumber, {
                    headers: { "x-auth": token }}).then(r => r.json());
                let result = response;
                changeMoveList(result);
                return;
            }

            async function getDetails() {
              if (selectedPoke != null && selectedPoke != loadedPoke) {
                let typeList = selectedPoke.pokemon.types[1] == null ? selectedPoke.pokemon.types[0] : selectedPoke.pokemon.types[0] + ", " + selectedPoke.pokemon.types[1];

                let initialAbilityList = selectedPoke.pokemon.abilities.filter(checkNull);
                let abilityList = "";

                for (let ability of initialAbilityList) {
                  if (initialAbilityList.indexOf(ability) === (initialAbilityList.length - 1)) {
                    abilityList += ability;
                  }
                  else {
                    abilityList += (ability + ", ");
                  }
                }

                await getMoveList();

                setDetailedInfo(
                  <Card className="team_card">
                    <h1 className="detailed_name">{selectedPoke.pokemon.name}</h1>
                    <Image url={selectedPoke.pokemon.imgurl}/>
                    <ul>
                      <li><h4>Pokedex Number: {selectedPoke.pokemon.pokedexNumber}</h4></li><br />
                      <li><h4>Height (m): {selectedPoke.pokemon.height}</h4></li><br />
                      <li><h4>Weight (kg): {selectedPoke.pokemon.weight}</h4></li><br />
                      <li><h4>Types: {typeList}</h4></li><br />
                      <li><h4>Abilities: {abilityList}</h4></li><br />
                      <p>
                        <b>{selectedPoke.pokemon.flavorText}</b>
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
                            <td>{selectedPoke.pokemon.hp}</td>
                            <td>{selectedPoke.pokemon.attack}</td>
                            <td>{selectedPoke.pokemon.defense}</td>
                            <td>{selectedPoke.pokemon.specialAttack}</td>
                            <td>{selectedPoke.pokemon.specialDefense}</td>
                            <td>{selectedPoke.pokemon.speed}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </ul>
                    {/*form to edit moves*/}
                    <Form>
                        <label>
                            Do not duplicate moves 
                            <label>
                                {selectMove(1)}
                                {selectMove(2)}
                                {selectMove(3)}
                                {selectMove(4)}
                            </label>
                        </label>
                        <Button onClick={updatePokemon}>Save</Button>
                    </Form>
                    {/*form to change pokemon*/}
                    <Form>
                        <label>
                            Or pick a new pokemon:   
                            {/* Not sure if I should sort by pokedex or alphabetical. 
                            With a list so long I'm inclined to choose alphabet, 
                            but you can change the API call I made if you desire. */}
                            <select value={newPokemon} onChange={(e) => changeNewPokemon(e.target.value)}>
                                {pokeList.pokemon.map((poke) => (
                                    <option value={poke.id}>{poke.name}</option>
                                ))}
                            </select>
                        </label>
                    <Button onClick={changePokemon}>Save</Button>
                    </Form>
                  </Card>);
                  setLoadedPoke(selectedPoke);
              }
          }
          getDetails();

          function selectMove(num) {
              // I'm not sure if this is actually how you are supposed to access a prop array
              // If this doesnt work the easiest fix is to copy paste it into where its being called, 
              // and change the moves array to be 4 different variables.

              //Note 2: why you booly me move.name
            return (
                <select value={moves[num]} onchange={(e) => changeMove(e.target.value)}>
                    <option>None</option>
                    {moveList.map((move) => (
                    <option value={move.id}>{move.name}</option>
                    ))}
                </select>
            )
          }
      });

        return (
            DetailedInfo
        );
    }

    function updatePokemon() {
        //See note in selectMove. You can also change value to be whatever is needed.
        //New requested moves in moves which should be an array of 4 moves, though i might not have done it right.
        //console.log("test update");
    }

    function changePokemon() {
        //newPokemon has a id in it. you can change to dexNum if you want on line 199 (at the time of me writing this note)
        //I dont know the API request to change the pokemon in list.
        //This functtion needs to refresh page on exec, to grab new mon from api.
        //console.log("test change");
    }

    function doSomething() {
        addRunAnalysis(runAnalysis + 1);
    }

    function dontSomething() {

    }

    

    useEffect(() => {
        async function GetAnalysis() {
          let token = sessionStorage.getItem("jwt");
          let response = await fetch("/api/team/analyze", {
            headers: { "x-auth": token }}).then(r => r.json());
          let result = response;
          setAnalysis(result);
        }
        GetAnalysis()
    }, [runAnalysis]);

    function Analysis() {
        let analysisText = "";
        if(analysis !== "" && runAnalysis !==0) {
            analysisText = analysis.map((a) => (
                <div className="analyis">
                    <p>{a.ok}</p>
                    <p>{a.warning}</p>
                    <p>{a.error}</p>
                </div>
            ));
        }
            
        return (
            analysisText
        );
    }

    
    function AnalyzeButton() {
        return (
            <Button variant="outline-secondary" className="team_builder_add_pokemon analyis" onClick={() => doSomething()}>Analyze</Button>
        );
    }

    return (
        <div className="team_builder_main">
            <div className="team_lineup">
                <TeamDisplay />
            </div>
            <div className='team_analysis'>
                
                <AnalyzeButton />
                <Analysis />
                <PokeCard />
            </div>
        </div>
    );
}