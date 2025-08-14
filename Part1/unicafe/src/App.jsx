import { useState } from 'react'

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({values}) => {
  const [good, neutral, bad] = values;
  const totalFeedback = good + neutral + bad;
  const totalScore = good * 1 + neutral * 0 + bad * -1;

  const calculateAverage = () => totalScore / totalFeedback;

  const calculatePositiveFeedback = () => (good / totalFeedback) * 100;

  if(totalFeedback == 0)
  {
    return (
      <p>No feedback given</p>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={totalFeedback}/>
        <StatisticLine text="average" value={calculateAverage()}/>
        <StatisticLine text="positive" value={calculatePositiveFeedback() + "%"}/>
      </tbody>
    </table>
  );
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics values={[good, neutral, bad]}/>
    </div>
  )
}

export default App