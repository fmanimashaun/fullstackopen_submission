const showCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>

      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt={country.name} width="100" />

      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature: {country.weather.main.temp} Celsius</p>

      <img
        src={`https://openweathermap.org/img/wn/${country.weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />

      <p>wind: {country.weather.wind.speed} m/s</p>
    </div>
  );
};

export default showCountry;