import { useState } from 'react'

const sumAll = (good, neutral, bad) => {
  return good+neutral+bad;
}

const Button = props => {
  let {onClick, text} = props;
  return (
    <button onClick={onClick}>{text}</button>
  )  
}

const StatisticLine = props => {
  const {text, value} = props;
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    )
  }
  
const Statistics = props => {
  let {good, neutral, bad} = props;
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="All" value={sumAll(good, neutral, bad)}/>
          <StatisticLine text="Average" value={(good-bad)/sumAll(good, neutral, bad)}/>
          <StatisticLine text="Percent good" value={(good/sumAll(good, neutral, bad))*100}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = type => {
    switch(type) {
      case "positive":
        setGood(good+1);
        break;
      case "neutral":
        setNeutral(neutral+1);
        break;
      case "bad":
        setBad(bad+1);
        break;
      default:
        setGood(good+1);
        break;
    }
  
  }
  
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="good" onClick={() => handleClick("positive")}></Button>
      <Button text="neutral" onClick={() => handleClick("neutral")}></Button>
      <Button text="bad" onClick={() => handleClick("bad")}></Button>
      {sumAll(good, neutral, bad) !== 0 ?
          <Statistics good={good} neutral={neutral} bad={bad} /> : <h1>No feedback given</h1> }
    </div>
  )
}

export default App