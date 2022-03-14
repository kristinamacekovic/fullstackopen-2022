import React from 'react'

const Header = ({course}) => <h1>{course.name}</h1>

const Part = ({id, name, exercises}) => <p>{name} {exercises}</p>

const Content = ({course}) => {
  let {id, name, parts} = course;
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Total = ({course}) => {
  let {id, name, parts} = course;
  let initial = 0;
  return (
    <p><strong>Number of exercises {parts.reduce((p,c)=>p+c.exercises,initial)}</strong></p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}



const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App