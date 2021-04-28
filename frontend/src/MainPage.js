import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect, useMemo } from 'react';



//I want to split this 


function SearchBar(props) {
  return (
    <Form className="SearchBar">
      <Form.Group>
        <Form.Control as="input" onChange={e => {props.setQuery(e.target.value); e.preventDefault()}} type="text" value={props.query} />
        <Button variant="outline-primary" onClick={(e) => {props.setSubmitQuery(props.query); e.preventDefault();}}>Search</Button>
        <Button variant="outline-danger" onClick={() => props.setCurrentPage(1)}>Cancel</Button>
      </Form.Group>
    </Form>
  );
}

function Image(props) {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    console.log("UseEffect fired inside image.")
    if (imageUrl === "") {
      async function getImage() {
        const src = props.url;
        const options = {
          headers: {
            'x-auth': props.userToken
          }
        };

        await fetch(src, options)
          .then(res => res.blob())
          .then(blob => {
            setImageUrl(URL.createObjectURL(blob));
          });
      }
      getImage();
    }
  });

  return (
    <img src={imageUrl} />
  );
}

export function MainPage(props) {
  const [pokemonInfo, setInitialInfo] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [submitQuery, setSubmitQuery] = useState("");


  useEffect(() => {
    console.log("useEffect fired inside mainpage.");
    async function getAllPokemon() {
      setInitialInfo([])
      let response = await fetch("/api/pokemon/small/" + currentPage, {
        headers: { "x-auth": props.userToken }
      }).then(r => r.json());
      let result = response;
      console.log(result.pokemon);
      setInitialInfo(result.pokemon);
      setPageNum(result.pages);
    }
    async function getQuery() {
      let response = await fetch("/api/pokemon/small/query/" + submitQuery, {
        headers: { "x-auth": props.userToken }
      }).then(r => r.json());
      let result = response;
      setInitialInfo(result.pokemon);
    }
    getQuery();
    getAllPokemon();
  }, [currentPage, submitQuery, props.userToken]);




  // useEffect(() => {
  //   async function getAllPokemon() {
  //     let tokenString = sessionStorage.getItem("jwt");
  //     let userToken = JSON.parse(tokenString);
  //     setInitialInfo([])
  //     let response = await fetch("/api/pokemon/small/" + currentPage, {
  //       headers: { "x-auth": userToken.token }
  //     }).then(r => r.json());
  //     let result = response;
  //     setInitialInfo(result.pokemon);
  //     setPageNum(result.pages);
  //   }
  //   getAllPokemon();
  // }, [currentPage]);


  const allPokemonRendered = useMemo(() => {
    function AllPokemon(pokemonInfo) {
      let PokemonDivs;
      console.log(pokemonInfo);
      if (pokemonInfo !== undefined || pokemonInfo.length !== 0) {
        PokemonDivs = pokemonInfo.map((entry) => (
          <div key={entry.pokedexNumber} className="PokemonElement">
            <a href={"/pokemon/" + entry.pokedexNumber}>
              <Image userToken={props.userToken} url={entry.imgurl} />
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
    return AllPokemon(pokemonInfo);
  }, [pokemonInfo])

    function PageButtons() {
      let Buttons = [];
      for (let i = 1; i <= pageNum; i++) {
        Buttons.push(
          <button key={i} onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        );
      }
      return (
        <div>
          {Buttons}
        </div>
      );
    }
    return (
      <div>
        <SearchBar setQuery={setQuery} setSubmitQuery={setSubmitQuery} setCurrentPage={setCurrentPage} query={query}/>
        {allPokemonRendered}
        <PageButtons />
      </div>
    );
  }