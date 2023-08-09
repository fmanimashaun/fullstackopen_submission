import { useState, useEffect } from 'react';
import countryServices from './services/countryServices';
import SearchForm from './components/SearchForm';
import CountryList from './components/CountryList';
import ShowCountry from './components/ShowCountry';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState('');
  const [showCountries, setShowCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        // get all countries
        const countries = await countryServices.getAllCountries();

        // set countries to state
        setCountries(countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
  }, []);


  useEffect(() => {
    const filteredCountries = countries.filter(({ name }) =>
      name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm) {
      if (filteredCountries.length > 10) {
        setNotification('Too many matches, specify another filter');
        setShowCountries([]);
      } else if (filteredCountries.length === 1) {
        setNotification('');
        const countryName = filteredCountries[0].name.common;
        handleShowCountry(countryName);
      } else {
        setNotification('');
        setShowCountries(filteredCountries);
      }
    } else {
      setShowCountries([]);
      setNotification('');
    }
  }, [searchTerm, countries]);

  const handleShowCountry = async (country) => {
    try {
      const fetchedCountry = await countryServices.getCountry(country);
      const capital = fetchedCountry.capital[0];
      const weather = await countryServices.getCountryWeather(capital);
      fetchedCountry.weather = weather;
      setShowCountries([fetchedCountry]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {notification && <p>{notification}</p>}
      {showCountries.length > 1 && (
        <CountryList
          countries={showCountries}
          handleShowCountry={handleShowCountry}
        />
      )}
      {showCountries.length === 1 && <ShowCountry country={showCountries[0]} />}
    </div>
  );
};

export default App;
