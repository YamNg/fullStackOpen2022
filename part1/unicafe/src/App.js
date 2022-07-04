import { useState } from 'react'


const SectionHeader = ({title}) => (
  <>
    <h1>
      {title}
    </h1>
  </>
)

const Button = ({handleClick, text}) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
)

const StatisticLine = ({title, stat, percentage}) => {
  return (
    <>
      <tr>
        <td>
          {title}:
        </td>
        <td>
          {stat ?? percentage + '%'}
        </td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
  <>
  {
    (good > 0 || neutral > 0 || bad > 0) ? (
      <table>
        <tbody>
          <StatisticLine title="good" stat={good}/>
          <StatisticLine title="neutral" stat={neutral}/>
          <StatisticLine title="bad" stat={bad}/>
          <StatisticLine title="all" stat={good + bad + neutral}/>
          <StatisticLine title="average" stat={((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)}/>
          <StatisticLine title="positive" percentage={(good / (good + neutral + bad) * 100)}/>
        </tbody>
      </table>
    ) : (
      <p>No feedback given</p>
    )
  }
  </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodScore = () => {
    setGood(good + 1)
  }

  const setNeutralScore = () => {
    setNeutral(neutral + 1)
  }

  const setBadScore = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <SectionHeader title="give feedback"/>
      <Button handleClick={setGoodScore} text="good" />
      <Button handleClick={setNeutralScore} text="neutral" />
      <Button handleClick={setBadScore} text="bad" />
      <SectionHeader title="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App