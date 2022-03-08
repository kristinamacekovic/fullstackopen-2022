import { useState } from 'react'

const sumAll = (good, neutral, bad) => {
    return good+neutral+bad;
}
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = props => {
  let {good, neutral, bad} = props;
  return (
  <div>
    <h1>Statistics</h1>
    <p>Good:{good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>All: {sumAll(good, neutral, bad)}</p>
    <p>Average: {(good-bad)/sumAll(good, neutral, bad)}</p>
    <p>Percent good: {(good/sumAll(good, neutral, bad))*100}%</p>
  </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handlePositive = () => {
      setGood(good+1);
  }
  const handleNeutral = () => {
      setNeutral(neutral+1);
  }
  const handleBad = () => {
      setBad(bad+1);
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="positive" onClick={() => handlePositive()}></Button>
      <Button text="neutral" onClick={() => handleNeutral()}></Button>
      <Button text="bad" onClick={() => handleBad()}></Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App