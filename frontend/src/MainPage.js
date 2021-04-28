import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react';


  
  //I want to split this 
export function MainPage() {
    const [pokemonInfo, setInitialInfo] = useState([]);
    const [pageNum, setPageNum] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const [submitQuery, setSubmitQuery] = useState("");
  
  
    useEffect(() => {
      async function getAllPokemon() {
        setInitialInfo("")
        let response = await fetch("/api/pokemon/small/" + currentPage).then(r => r.json());
        let result = response;
        setInitialInfo(result.pokemon);
        setPageNum(result.pages);
      }
      async function getQuery() {
        let response = await fetch("/api/pokemon/small/query/" + submitQuery).then(r => r.json());
        let result = response;
        setInitialInfo(result.pokemon);
      }
      getQuery();
      getAllPokemon();
    }, [currentPage, submitQuery]);

    

      function SearchBar() {    
        return (
            <Form className="SearchBar">
              <Form.Group>
                <Form.Control as="input"  onChange={e => setQuery(e.target.value)} type="text" value={query} />
                <Button variant="outline-primary" onClick={() => setSubmitQuery(query)}>Search</Button>
                <Button variant="outline-danger" onClick={() => setCurrentPage(1)}>Cancel</Button>
              </Form.Group>
            </Form>
          ); 
      }
  
    function AllPokemon() {
        let PokemonDivs;
        if(pokemonInfo.length !== 0) {
          PokemonDivs = pokemonInfo.map((entry) => (
              <div key={entry.pokedexNumber} className="PokemonElement">
                <a href={"/pokemon/" + entry.pokedexNumber}>
                  <img src={entry.imgurl} alt={entry.name + " image"} />
                  <h4>{entry.name}</h4>
                  <h8>#{entry.pokedexNumber}</h8>
                </a>
              </div>
            
          ));
        }
        return ( 
          <div className="MainPageList">
            {PokemonDivs} 
          </div>
          );
    }
  
    //Ought to use react buttons instead of html
    function PageButtons() {
      let Buttons=[];
      for(let i = 1; i <= pageNum; i++) {
        Buttons.push(
          <button key={i} onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        );
      }
      console.log(Buttons);
      return (
        <div>
          {Buttons}
        </div>
      );
    }
    return (
        <div>
            {SearchBar()}
            <AllPokemon />
            <PageButtons />
        </div>
    );
    
  }
  