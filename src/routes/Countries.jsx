import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Row from "react-bootstrap/Row";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavouritesFromSource } from "../auth/firebase";
import { getVisitedFromSource } from "../auth/firebase";
import { Form, Spinner } from "react-bootstrap";
import { initializeCountries } from "../store/countriesSlice";
import { useEffect, useState } from "react";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";
import { addVisited, removeVisited } from "../store/visitedSlice";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const visited = useSelector((state) => state.visited.visited);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
    dispatch(getVisitedFromSource());
  }, [dispatch]);

  useEffect(() => { }, [search]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row>
        <div className='search'>

          <Form.Control
            style={{ width: "18rem" }}
            type="search"
            className="me-2 "
            placeholder="Search for countries"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Row>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100">
                <div className='favVisitBox'>
                  <div>

                    {favourites.some(
                      (favourite) => favourite === country.name?.common
                    ) ? (
                      <FavoriteBorderIcon onClick={() => dispatch(removeFavourite(country.name.common))} />
                    ) : (
                      <FavoriteIcon onClick={() => dispatch(addFavourite(country.name.common))} />
                    )}
                  </div>
                  <div>

                    {visited.some(
                      (visit) => visit === country.name?.common
                    ) ? (
                      <AirplanemodeActiveIcon
                        onClick={() =>
                          dispatch(removeVisited(country.name.common))
                        }
                      />
                    ) : (
                      <AirplanemodeInactiveIcon onClick={() => dispatch(addVisited(country.name.common))} />
                    )}
                  </div>
                </div>
                <Link to={`/countries/${country.name.common}`} state={{ country: country }}>
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;
