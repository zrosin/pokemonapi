import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { DetailedPokemon } from './DetailedPokemon';
import { MainPage } from './MainPage';




function Navigation() {
  return (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={Link} to="/">Pokédex!</Navbar.Brand>
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
            <MainPage/>
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




export default App;
