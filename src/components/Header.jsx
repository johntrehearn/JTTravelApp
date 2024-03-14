import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../auth/firebase";

const Header = () => {
  const [user] = useAuthState(auth);

  const [name, setName] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const name = doc.data().name;
        setName(name);
      });
    };

    if (user) {
      getUserData();
    }
  }, [user]);

  return (
    <Container fluid>
      <Row>

        <Navbar id='header'>

          <Container className="justify-content-end">

            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">

              <div class="navButt">


                <Nav>

                  <Link to="/">
                    <Button type="button" class="btn btn-primary">Home</Button>
                  </Link>
                  <Link to="/countries">
                    <Button type="button" class="btn btn-primary">Countries</Button>
                  </Link>
                  <Link to="/favourites">
                    <Button type="button" class="btn btn-primary">Favourites</Button>
                  </Link>
                  <Link to="/visited">
                    <Button type="button" class="btn btn-primary">Visited</Button>
                  </Link>
                  <Link to="/register">
                    <Button type="button" class="btn btn-primary">Register</Button>
                  </Link>

                </Nav>
              </div>

              {/* Text Container for User */}
              <Navbar.Text>
                {name ? `Welcome, ${name}` : "Welcome, Guest"}
              </Navbar.Text>
              {/* Login*/}

              <div class="login">


                <Link to="/login">
                  <Button variant="contained">Login</Button>
                </Link>
                <Button onClick={logout}>Logout</Button>

              </div>

            </Navbar.Collapse>

          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
