//sessionStorage.clear();

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import React, { useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { DetailedPokemon } from './DetailedPokemon';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import { MainPage } from './MainPage';
function Navigation() {
  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">Pokédex!</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Main Page</Nav.Link>
      </Nav>
      </Navbar>
    );
}



function Login({setToken}) {
  const history = useHistory();

  const [UserName, setUserName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [HasAttempted, setHasAttempted] = useState(false);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    console.log("useEffect fired inside login.");
    if(HasAttempted) {
      async function authenticate() {
        const response = await fetch("/api/user/auth", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },      
          body: JSON.stringify({ 
             username: UserName,
             password: PassWord })
        }).then(r => r.json());
        if (!('message' in response)) {
          console.log(response.token);
          sessionStorage.setItem("jwt", response.token);
          setToken(response.token);
          // setIsAuthenticated(true);
        }
        else {
          setAlert(response.message);
        }
      }
      authenticate();
      setHasAttempted(false);
    }
  }, [HasAttempted, alert, UserName, PassWord, setToken]);

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }

    return (
      <div className = "login">
        <div>
          {alert}
        </div>
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

function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("jwt");
    // const userToken = JSON.parse(tokenString);
    // return userToken?.token
    return tokenString
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem("jwt", userToken);
    setToken(userToken.token);
  };

  return {
    token,
    setToken: saveToken
  }
}

function App() {
  const { token, setToken } = useToken();

    if(!token) {
      return (
        <>
          <Router>
            <Navbar bg="dark" variant="dark">
              <Navbar.Brand as={Link} to="/login">Login</Navbar.Brand>
            </Navbar>
            <Login setToken={setToken} />
          </Router>
        </>
      );
    }

    return (
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route path="/pokemon/:dexNum">
            <DetailedPokemon />
          </Route>
          <Route exact path={["/", "/pokemon"]}>
            <MainPage userToken={token} />
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
