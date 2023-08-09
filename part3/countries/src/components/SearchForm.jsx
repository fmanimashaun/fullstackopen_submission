const SearchForm = ({ searchTerm, setSearchTerm }) => {
  return (
    <label>
      Find countries{' '}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </label>
  );
};

export default SearchForm;