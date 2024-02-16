import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { logout } from "../auth/firebase";


import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth/firebase';



const Header = () => {

  const [user, loading, error] = useAuthState(auth);

  console.log("!!!!!", user);

  function checkLoggedIn() {
    if (localStorage.getItem('user')) {
      document.getElementById('notLoggedIn').style.display = 'none';
      document.getElementById('loggedIn').style.display = 'block';
    } else {
      document.getElementById('loggedIn').style.display = 'none';
      document.getElementById('notLoggedIn').style.display = 'block';
    }
  }
  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button variant="contained">Countries</Button>
                </Link>
                <Link to="/favourites">
                  <Button variant="contained">Favourites</Button>
                </Link>
                <Link to="/register">
                  <Button id='notLoggedIn' variant="contained">Register</Button>
                </Link>
                <Link to="/login">
                  <Button id='notLoggedIn' variant="contained">login</Button>
                </Link>
                <Button id='loggedIn' onClick={logout}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
