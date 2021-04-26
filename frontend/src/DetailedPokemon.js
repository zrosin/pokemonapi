import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { checkNull } from './App';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';


export function formatAbilities(abilityList) {
  let initialAbilityList = abilityList.filter(checkNull);
  let formattedList = "";
  for (let ability of initialAbilityList) {
    if (initialAbilityList.indexOf(ability) === (initialAbilityList.length - 1)) {
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
      <MoveSetTable mon={params.dexNum} />
    </div>
  );
}


export function MoveSetTable(props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [tableData, setTableData] = useState([]);
  const [filterableTypes, setFilterableTypes] = useState({});
  const pagination = paginationFactory({
    paginationSize: 10 
  })
  useEffect(() => {
    async function getData() {
      const moveSet = await fetch(`/api/pokemon/moveset/${props.mon}`).then(r => r.json());
      let arr = {};
      const moveValues = moveSet.map((i) => {
        i.move = i.move[0]
        i.move.power = (i.move.power === null) ? 0 : i.move.power;
        if (!(i.move.type in arr)) {
          arr[i.move.type] = i.move.type;
        }
        return {
          name: i.move.name,
          type: i.move.type,
          damageClass: i.move.damageClass,
          pp: i.move.pp,
          power: i.move.power,
          level: i.level,
          learnedVia: i.learnedVia,
          flavorText: i.move.flavorText
        }
      });
      console.log(arr);
      // don't ask me why React Bootstrap Table needs the filterables sent like this.
      setFilterableTypes(arr);
      setTableData(moveValues);
    }
    getData();
  }, [props.mon]);
  const columns = [
    {
      text: 'Name',
      dataField: 'name',
    },
    {
      text: 'Type',
      dataField: 'type',
      formatter: cell => filterableTypes[cell],
      filter: selectFilter({
        options: filterableTypes
      })
    },
    {
      text: 'Damage Class',
      dataField: 'damageClass'
    },
    {
      text: 'PP',
      dataField: 'pp',
    },
    {
      text: 'Power',
      dataField: 'power',
    },
    {
      text: 'Level Learned',
      dataField: 'level',
    },
    {
      text: 'Learned Via',
      dataField: 'learnedVia'
    },
    {
      text: 'Description',
      dataField: 'flavorText'
    }
  ];
  return (
    <>
    <h4>Moveset:</h4>
    <BootstrapTable bootstrap4 keyField='name' data={ tableData } columns={ columns }
    pagination={ pagination } filter={ filterFactory() }/>
    </>
  );

}