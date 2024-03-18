import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const country = location.state.country;

  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("Weather: ", weather);

  const apiKey = import.meta.env.VITE_MAP_API;

  const map = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${country.name.common}`;

  const weatherAPI = import.meta.env.VITE_APP_OPEN_WEATHER_API;

  console.log("Weather API: ", weatherAPI);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${weatherAPI}`
      )
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [country.capital]);

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
    <div id='singleContainer'>
      <Row className="m-5">
        <Row className='countrySingleInfo'>
          <Col>
            <div className='text'>

              <div className='countrySingleTitle'>

                {" "}
                <h2 className="display-4">{country.name.common}</h2>
                <h3>Capital: {country.capital}</h3>
                <h3>Time Zone: {country.timezones} </h3>
              </div>
            </div>
          </Col>
          <Col>
            <Image id='singleCountriesImage'

              src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
            />
          </Col>
        </Row>
        <Col>
          <Row id='singleCountriesWeather'>
            {!error && weather && (
              <div>
                <p className='weather'>
                  Right now it is <strong>{weather.main.temp}</strong> degrees in{" "}
                  {country.capital} and {weather.weather[0].description}
                </p>
                <div className='weatherIMG'>

                  <img className='weather'
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                  />
                </div>
              </div>
            )}
          </Row>
        </Col>
        <Col>
          {
            <div>
              <iframe width={560} height={315}
                src={map}>
              </iframe>
            </div>
          }
        </Col>
      </Row>
      <Row>

        <Col>
          <Button variant="light" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </div >
  );
};

export default CountriesSingle;
