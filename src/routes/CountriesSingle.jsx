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




  return (
    <Container>

      <div>Single Country will be here</div>
    </Container>
  );
};

export default CountriesSingle;
