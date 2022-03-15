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
  //sum was already implemented using reduce, adding the comment just to commit as a separate change
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
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App