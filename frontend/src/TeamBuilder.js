import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export function TeamBuilder() {
    const [pokemonSelected, setPokemon] = useState("");
    /*
    This function sends a proper request for an image with the authentication header.
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
    */
    //pokemonSelected needs to be a default mon that just has no info or something.
    function TeamDisplay() {
        let Team = "";

        if (pokemonSelected) {
            //<Image url={poke.url} alt={poke.name + "image"} />
            Team = pokemonSelected.localeCompare((poke) => (
                <div className="team_builder_pokemon">
                    <img src={poke.url} alt={poke.name + "image"} />
                    <div className="team_builder_pokemon_info">
                        <h6>{poke.name}</h6>
                    </div>
                </div>
            ));
        }

        return (
            Team
        );
    }

    function doSomething() {
        return true;
    }

    //This is what will call whatever we bring up to pick the next pokemon. How exactly thats done will have to wait until i know what that will look like.
    //Should be changed to a react button
    function AddPokemon() {
        if(pokemonSelected.length < 6)
        return (
            <Button variant="outline-primary" className="team_builder_add_pokemon" onClick={() => doSomething()}>Add Pokemon</Button>
        );
        
    }

    return (
        <div className="team_builder_main">
            <div className="team_lineup">
                <TeamDisplay />
                <AddPokemon />
            </div>
            <div className='team_analysis'>
                <p>Analysis</p>
            </div>
        </div>
    );
}