import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getVisitedFromSource } from "../auth/firebase";
import { initializeCountries } from "../store/countriesSlice";
import { addVisited, removeVisited } from "../store/visitedSlice";

const Visited = () => {
  const dispatch = useDispatch();

  const visited = useSelector((state) => state.visited.visited);
  let countriesList = useSelector((state) => state.countries.countries);

  if (visited.length > 0) {
    countriesList = countriesList.filter((country) =>
      visited.includes(country.name.common)
    );
  } else {
    countriesList = [];
  }

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getVisitedFromSource());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row xs={2} md={3} lg={4} className=" g-3">
        {countriesList.map((country) => (
          <Col key={country.name.official} className="mt-5">
            <Card className="h-100">
              {visited.some(
                (visit) => visit === country.name?.common
              ) ? (
                <FavoriteBorderIcon
                  onClick={() => dispatch(removeVisited(country.name.common))}
                />
              ) : (
                <FavoriteIcon
                  onClick={() => dispatch(addVisited(country.name.common))}
                />
              )}
              <Card.Img
                variant="top"
                className="rounded h-50"
                src={country.flags.svg}
                style={{
                  objectFit: "cover",
                  minHeight: "200px",
                  maxHeight: "200px",
                }}
              />
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

export default Visited;
