import { useState } from 'react';

const Button = ({ handleclick, text }) => (
  <button onClick={handleclick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const percentagePositive = (good / total) * 100;
  return (
    <div>
      <h2>statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="total" value={total} />
            <StatisticLine text="average" value={average.toFixed(2)} />
            <StatisticLine text="positive" value={percentagePositive.toFixed(2) + '%'} />
          </tbody>
        </table>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleclick = (value, setter) => () => {
    setter(value + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleclick={handleclick(good, setGood)} text="good" />
      <Button handleclick={handleclick(neutral, setNeutral)} text="neutral" />
      <Button handleclick={handleclick(bad, setBad)} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
