import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export function TeamBuilder() {
    const [pokemonSelected, setPokemon] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [runAnalysis, addRunAnalysis] = useState(0);
    
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
          <img src={imageUrl}/>
        );
      }
    //pokemonSelected needs to be a default mon that just has no info or something.

    useEffect(() => {
        async function getTeamPokemon() {
          let token = sessionStorage.getItem("jwt");
          let response = await fetch("http://localhost:8000/api/team/", {
            headers: { "x-auth": token }}).then(r => r.json());
          let result = response;
          setPokemon(result.comp);
        }
        getTeamPokemon()
    }, []);

    function TeamDisplay() {
        let Team = "";

        if (pokemonSelected) {
            
            Team = pokemonSelected.map((poke) => (
                <div className="team_builder_pokemon">
                    <Image url={poke.url} alt={poke.name + "image"} />
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
        addRunAnalysis(runAnalysis + 1);
    }

    function dontSomething() {

    }

    useEffect(() => {
        async function GetAnalysis() {
          let token = sessionStorage.getItem("jwt");
          let response = await fetch("http://localhost:8000/api/team/analyze", {
            headers: { "x-auth": token }}).then(r => r.json());
          let result = response;
          setAnalysis(result);
        }
        GetAnalysis()
    }, [runAnalysis]);

    //This is what will call whatever we bring up to pick the next pokemon. How exactly thats done will have to wait until i know what that will look like.
    //Should be changed to a react button
    function AddPokemon() {
        if(pokemonSelected.length < 6)
        return (
            <Button variant="outline-primary" className="team_builder_add_pokemon" onClick={() => dontSomething()}>Add Pokemon</Button>
        );
    }
    function AnalyzeButton() {
        return (
            <Button variant="outline-primary" className="team_builder_add_pokemon" onClick={() => doSomething()}>Analyze</Button>
        );
    }

    return (
        <div className="team_builder_main">
            <div className="team_lineup">
                <TeamDisplay />
                {AddPokemon()}
            </div>
            <div className='team_analysis'>
                <AnalyzeButton />
                {analysis.ok}
            </div>
        </div>
    );
}