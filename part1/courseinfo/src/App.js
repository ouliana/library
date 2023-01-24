const Header = props => {
  const { course } = props;
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Part = props => {
  const { name, exercises } = props.info;
  return (
    <>
      <p>
        {name} {exercises}
      </p>
    </>
  );
};

const Content = props => {
  const { parts } = props.course;
  return (
    <>
      <Part info={parts[0]} />
      <Part info={parts[1]} />
      <Part info={parts[2]} />
    </>
  );
};

const Total = props => {
  const { parts } = props.course;
  return (
    <>
      <p>
        Number of exercises{' '}
        {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default App;
