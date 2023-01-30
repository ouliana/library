const Header = ({ name }) => <h1>{name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map(({ id, ...details }) => (
      <Part
        key={id}
        part={details}
      />
    ))}
  </>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, current) => sum + current.exercises, 0);
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  );
};

export default Course;
