const Filter = props => {
  const { query, handleQueryChange } = props;

  return (
    <div>
      Filter shown with{' '}
      <input
        type='text'
        value={query}
        onChange={handleQueryChange}
      />
    </div>
  );
};

export default Filter;
