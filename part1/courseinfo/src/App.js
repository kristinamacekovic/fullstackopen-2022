import React from 'react'

const Header = ({course}) => <h1>{course.name}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>


const Content = ({course}) => {
    let {name, parts} = course;
    let [part1, part2, part3] = parts;
    return (
      <div>
        <Part part={part1}/>
        <Part part={part2}/>
        <Part part={part3}/>
      </div>
    )
}

const Total = ({course}) => {
  let {name, parts} = course;
  let [part1, part2, part3] = parts;
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>
    </div>
  )
}

export default App