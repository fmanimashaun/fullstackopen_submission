import { useState } from 'react';

const Button = ({ handleclick, text }) => (
  <button onClick={handleclick}>
    {text}
  </button>
);
const Display = ({ good, neutral, bad }) => {
  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleclick = (value, setter) => () => {
    setter(value + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleclick={handleclick(good, setGood)} text="good" />
      <Button handleclick={handleclick(neutral, setNeutral)} text="neutral" />
      <Button handleclick={handleclick(bad, setBad)} text="bad" />

      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App