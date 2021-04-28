//sessionStorage.clear();

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import { DetailedPokemon } from './DetailedPokemon';



function Navigation() {
  if(sessionStorage.getItem("jwt")) {
    return(
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Pokédex!</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Main Page</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
  return (
  <Navbar bg="dark" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/login">Log in</Nav.Link>
      {/* links for disabled routes, uncomment routes to make sure these do anything if we want them back. */}
      {/* <Nav.Link as={Link} to="/updatepokemon">Update Pokemon</Nav.Link>
      <Nav.Link as={Link} to="/getpokemon">Get Pokemon</Nav.Link>
      <Nav.Link as={Link} to="/postpokemon">Post Pokemon</Nav.Link>
      <Nav.Link as={Link} to="/deletepokemon">Delete Pokemon</Nav.Link> */}
    </Nav>
  </Navbar>
  );
}

function Login() {
  const [UserName, setUserName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [HasAttempted, setHasAttempted] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    if(HasAttempted) {
      async function authenticate() {
        console.log(`${UserName}: ${PassWord}`)
        const response = await fetch("/api/user/auth", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },      
          body: JSON.stringify({ 
             username: UserName,
             password: PassWord })
        });
        let tokenResponse = await response.json();
        console.log(tokenResponse.token);
        if (!('message' in response)) {
          sessionStorage.setItem("jwt", tokenResponse.token);
        }
        else {
          setAlert(response.message);
        }
      }
      authenticate();
      setHasAttempted(false);
    }
  }, [HasAttempted, alert, UserName, PassWord]);

  function AlertBox() {
    if(alert !== "") {
      return(
        <Alert variant={'danger'}>
          {alert}
        </Alert>
      );
    }
    else {
      return (
        ""
      );
    }
  }

  return (
    <div className = "login">
      <AlertBox />
      <Form onSubmit={(e) => {setHasAttempted(true); e.preventDefault()}}>
        <Form.Row>
          <Form.Group>
            <Form.Label>Enter Username:</Form.Label>
            <Form.Control as="input" onChange={e => setUserName(e.target.value)} type="text" value={UserName}></Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group>
            <Form.Label>Enter Password:</Form.Label>
            <Form.Control as="input" onChange={e => setPassWord(e.target.value)} type="password" value={PassWord}></Form.Control>
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">Login</Button>
      </Form>
    </div>
  );
}

function AuthenticatedRoutes() {
  if(sessionStorage.getItem("jwt")) {
    return(
        <Switch>
          <Route path="/pokemon/:dexNum">
            <DetailedPokemon />
          </Route>
          <Route exact path={["/", "/pokemon"]}>
            <GetPokemonForMainPage />
          </Route>
        </Switch>
    );
  }
  return (
    <Redirect to='/login' />
  );
}

function App() {
    return (
      <Router>
        <Navigation></Navigation>
        <AuthenticatedRoutes />
        <Switch>
          <Route path="/login">
            <Login />
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
            <a href={"/pokemon/" + entry.pokedexNumber}>
              <Image url={entry.imgurl} />
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
