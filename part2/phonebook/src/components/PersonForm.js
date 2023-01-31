const PersonForm = props => {
  const {
    newName,
    newNumber,
    handleSubmit,
    handleNameChange,
    handleNumberChange,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name:{' '}
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        Number:{' '}
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
