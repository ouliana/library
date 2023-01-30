import Part from './Part';

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

export default Content;
