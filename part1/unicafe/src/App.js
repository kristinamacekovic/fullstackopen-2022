import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

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
  const sumAll = () => {
      return good+neutral+bad;
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="positive" onClick={() => handlePositive()}></Button>
      <Button text="neutral" onClick={() => handleNeutral()}></Button>
      <Button text="bad" onClick={() => handleBad()}></Button>
      <h1>Statistics</h1>
      <p>Good:{good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {sumAll()}</p>
      <p>Average: {(good-bad)/sumAll()}</p>
      <p>Percent good: {(good/sumAll())*100}%</p>
    </div>
  )
}

export default App