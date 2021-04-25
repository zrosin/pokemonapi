import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { DetailedPokemon } from './DetailedPokemon';



function Navigation() {
  return (
  <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Main Page</Nav.Link>
      {/* links for disabled routes, uncomment routes to make sure these do anything if we want them back. */}
      {/* <Nav.Link as={Link} to="/updatepokemon">Update Pokemon</Nav.Link>
      <Nav.Link as={Link} to="/getpokemon">Get Pokemon</Nav.Link>
      <Nav.Link as={Link} to="/postpokemon">Post Pokemon</Nav.Link>
      <Nav.Link as={Link} to="/deletepokemon">Delete Pokemon</Nav.Link> */}
    </Nav>
  </Navbar>
  );
}

function App() {
    return (
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route path="/pokemon/:dexNum">
            <DetailedPokemon />
          </Route>
          <Route exact path={["/", "/pokemon"]}>
            <GetPokemonForMainPage/>
          </Route>
        </Switch>
        {/* disabled routes. uncomment and fix imports to reenable. */}
        {/* <Switch>     
          <Route path="/getpokemon">
            <GetPokemonOnDexNum/>
            <GetPokemonOnType /><br />
            <GetPokemonOnID mons={5}/>
            <GetAllPokemon />
          </Route>
        </Switch> */}
        {/* <Switch>
          <Route path="/updatepokemon">
            <UpdatePokemon mons={5}/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/postpokemon">
            <PostPokemon />
          </Route>
        </Switch>
        <Switch>
          <Route path="/deletepokemon">
            <DeletePokemon mons={5}/>
          </Route>
        </Switch>     */}
      </Router>);
}

export function checkNull(ability) {
  return ability !== null;
}



function GetPokemonForMainPage() {
  const [initialInfo, setInitialInfo] = useState([]);
  
  
  useEffect(() => {
    async function getAllPokemon() {
      setInitialInfo("")
      let response = await fetch("/api/pokemon/").then(r => r.json());
      let result = response;
      setInitialInfo(result);
    }
    getAllPokemon();
  }, []);

  function AllPokemon() {
    let PokemonDivs;
    if(initialInfo.length !== 0) {
      PokemonDivs = initialInfo.map((entry) => (
          <div key={entry.pokedexNumber} className="PokemonElement">
            <Link to={"/pokemon/" + entry.pokedexNumber}>
              <img src={entry.imgurl} alt={entry.name + " image"} />
              <h4>{entry.name}</h4>
              <h8>#{entry.pokedexNumber}</h8>
            </Link>
          </div>
        
      ));
    }
    return ( 
      <span className="MainPageList">
        {PokemonDivs} 
      </span>
      );
  }

  
  return (
        <AllPokemon />
  );
  
}










export default App;
