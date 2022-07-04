import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const SectionHeader = ({title}) => (
  <>
    <h1>
      {title}
    </h1>
  </>
)

const Anecdote = ({text}) => (
  <>
    <p>
      {text}
    </p>
  </>
)

const VoteCount = ({vote}) => (
  <>
    <p>
      has {vote} votes
    </p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const setSelectedAnecdotes = () => setSelected((selected + 1) >= anecdotes.length ? 0 : (selected + 1))
  const incrementVotes = () => {
    let copy = [...votes]
    copy[selected] = copy[selected] + 1
    setVotes(copy)
  }

  const maxVote = Math.max(...votes)
  const maxVoteIndex = votes.indexOf(maxVote)

  return (
    <div>
      <SectionHeader title="Anecdote of the day"/>
      <Anecdote text={anecdotes[selected]}/>
      <VoteCount vote={votes[selected]}/>
      <Button handleClick={incrementVotes} text="vote"/>
      <Button handleClick={setSelectedAnecdotes} text="next anecdote"/>

      <SectionHeader title="Anecdote with most votes"/>
      <Anecdote text={anecdotes[maxVoteIndex]}/>
      <VoteCount vote={votes[maxVoteIndex]}/>
    </div>
  )
}

export default App