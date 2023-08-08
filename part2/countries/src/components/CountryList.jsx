const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}
          <button
            type="button"
            onClick={() => handleShowCountry(country.name.common)}>
            show
          </button>
        </p>
      ))}
    </div>
  );
};

export default CountryList;
