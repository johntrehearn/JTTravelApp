import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Image, Row, Spinner } from 'react-bootstrap';







const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(location);

  //Creating a useEffect to handle our requests to the weather API

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=7db693258e4634c591f2445652fcf153`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((result) => {
        setWeather(result.data);
        console.log("The weather is...", result.data);
        setLoading(false);
      });

  }, [country.capital]);

  console.log("Weather: ", weather);


  //Handling the Loading Case

  if (loading) {
    return (
      <Col className='text-center m-5'>
        <Spinner
          animation='border'
          role='status'
          className='center'
          variant='info'
        >
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container>
      <Row className='m-5'>
        <Col>
          {""}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
          />
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capitsl {country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Weather right now is <strong>{weather.main.temp}</strong>{" "}
                degrees in {country.capital} and {""}
                {weather.weather[0].description}
              </p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt='weather icon'
              />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant='light' onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>

    </Container>
  );
};

export default CountriesSingle;
