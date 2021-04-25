import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { checkNull } from './App';

export function formatAbilities(abilityList) {
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
export function DetailedPokemon() {
  const params = useParams();
  const [DetailedInfo, setDetailedInfo] = useState("");

  useEffect(() => {
    if (DetailedInfo === "") {
      async function getDetails() {
        const response = await fetch(`../api/pokemon/pokedex/${params.dexNum}`).then((r) => r.json());
        if (!('message' in response)) {
          let typeList = response.types[1] == null ? response.types[0] : response.types[0] + ", " + response.types[1];
          let initialAbilityList = response.abilities.filter(checkNull);
          let abilityList = "";
          for (let ability of initialAbilityList) {
            if (initialAbilityList.indexOf(ability) === (initialAbilityList.length - 1)) {
              abilityList += ability;
            }
            else {
              abilityList += (ability + ", ");
            }
          }
          setDetailedInfo(
            <div className="neat">
              <h1>{response.name}</h1>
              <img src={response.imgurl} alt=" " width="400" height="400" />
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

  return (
    <div>
      {DetailedInfo}
    </div>
  );
}
