const Total = ({ course }) => {
  return (
    <p>
      <strong>
        total of {course.parts.reduce((acc, next) => acc + next.exercises, 0)}{' '}
        exercises
      </strong>
    </p>
  );
};

export default Total;
