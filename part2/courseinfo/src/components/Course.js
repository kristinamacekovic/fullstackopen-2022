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

export default Course