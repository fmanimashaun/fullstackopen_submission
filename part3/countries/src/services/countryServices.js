import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q="; //{city name}&appid={API key}

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const getAllCountries = async () => {
  const response = await axios.get(`${baseUrl}all`);
  return response.data;
};


const getCountry = async (name) => {
  const response = await axios.get(`${baseUrl}name/${name}`);
  return response.data;
};

const getCountryWeather = async (capital) => {
  const response = await axios.get(`${weatherBaseUrl}${capital}&appid=${WEATHER_API_KEY}&units=metric`);

  return response.data;
};

const countryServices = { getAllCountries, getCountry, getCountryWeather };

export default countryServices;