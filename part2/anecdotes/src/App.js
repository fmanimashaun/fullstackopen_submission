import { useState, useMemo } from 'react';

const Button = ({ handleclick, text }) => {
  return <button onClick={handleclick}>{text}</button>;
};

const MostVotesAnecdote = ({ votes, anecdotes }) => {
  const max = useMemo(() => Math.max(...votes), [votes]);
  const index = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
      <p>has {max} {max < 2 ? 'vote' : 'votes'}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleclick = (value, setValue) => {
    if (setValue === setSelected) {
      return () => {
        const random = Math.floor(Math.random() * anecdotes.length);
        setSelected(random);
      };
    } else {
      return () => {
        const copy = [...votes];
        copy[value] +=  1;
        setVotes(copy);
      };
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]} {votes[selected]} {votes[selected] < 2 ? 'vote' : 'votes'}</p>
      <Button handleclick={handleclick(selected, setVotes)} text="vote" />
      <Button handleclick={handleclick(selected, setSelected)} text="next anecdote" />
      <MostVotesAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
