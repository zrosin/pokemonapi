import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { DetailedPokemon } from './DetailedPokemon';



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
            <SeachBar/>
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


//Works but causes page to rerender, which might actually kill the progress once its set up all the way. Still needs it query call and the be connected to intitalInfo.
class SeachBar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getQuery = this.getQuery.bind(this);
  }

  handleChange(event) {    
    this.setState({value: event.target.value});  
  }

  handleSubmit(event) {
    this.getQuery();
  }

  async getQuery() {
    let response = await fetch("/api/pokemon/small/query/" + this.state.value).then(r => r.json());
    //Give result to initialInfo.
  }
  

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function GetPokemonForMainPage() {
  const [initialInfo, setInitialInfo] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  
  useEffect(() => {
    async function getAllPokemon() {
      setInitialInfo("")
      let response = await fetch("/api/pokemon/small/" + currentPage).then(r => r.json());
      let result = response;
      setInitialInfo(result.pokemon);
      setPageNum(result.pages);
    }
    getAllPokemon();
  }, [currentPage]);

  function AllPokemon() {
    let PokemonDivs;
    if(initialInfo.length !== 0) {
      PokemonDivs = initialInfo.map((entry) => (
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
        <AllPokemon />
        <PageButtons />
      </div>
  );
  
}










export default App;
