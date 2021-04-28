import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


  
  //I want to split this 
export function MainPage() {
  const [initialInfo, setInitialInfo] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  
  useEffect(() => {
    async function getAllPokemon() {
      let token = sessionStorage.getItem("jwt");
      setInitialInfo("")
      let response = await fetch("/api/pokemon/small/" + currentPage, {
        headers: { "x-auth": token }}).then(r => r.json());
      let result = response;
      setInitialInfo(result.pokemon);
      setPageNum(result.pages);
    }
    getAllPokemon();
  }, [currentPage]);

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
      <img src={imageUrl}/>
    );
  }

  function AllPokemon() {
    let PokemonDivs;
    if(initialInfo.length !== 0) {
      PokemonDivs = initialInfo.map((entry) => (
          <div key={entry.pokedexNumber} className="PokemonElement">
            <Link to={"/pokemon/" + entry.pokedexNumber}>
              <Image url={entry.imgurl} />
              <h4>{entry.name}</h4>
              <h8>#{entry.pokedexNumber}</h8>
            </Link>
          </div>
        
      ));
    }
    return ( 
      <div className="MainPageList">
        {PokemonDivs} 
      </div>
      );
  }

  function PageButtons() {
    let Buttons=[];
    for(let i = 1; i <= pageNum; i++) {
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
        <AllPokemon />
        <PageButtons />
      </div>
  );
  
}
  