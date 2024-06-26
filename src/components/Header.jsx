import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../auth/firebase";

const Header = () => {
  
  const [user] = useAuthState(auth);

  const [name, setName] = useState();

  const [logIN, setLogIN] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const name = doc.data().name;
        setName(name);
        setLogIN(false);
      });
    };

    if (user) {
      getUserData();
    }
  }, [user]);

  function logoutReset() {
    setName(null);
    logout();
  }

  return (
    <Container fluid>
      <Row>

        <Navbar id='header'>

          <Container class="split">





            <div class='jt'>



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


                </Nav>
              </div>

              {/* Text Container for User */}
              <Navbar.Text>
                {name ? `Welcome ${name} ` : "Welcome, Guest - Please register or login"}
              </Navbar.Text>

              {/* Login*/}

              <div class="login">

                {name ?
                  <Button onClick={logoutReset}>Logout</Button>
                  :
                  <>
                    <Link to="/login">
                      <Button type="button">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button type="button" class="btn btn-primary">Register</Button>
                    </Link>
                  </>
                }
              </div>

            </div>

          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
