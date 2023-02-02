import Person from './Person';

const Persons = props => {
  const { persons, handleDelete } = props;
  return (
    <div>
      {persons.map(person => {
        return (
          <div key={person.id.toString()}>
            <Person person={person} />
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Persons;
