const CourseHeader = ({ course }) => <h2>{course.name}</h2>

const Total = ({ parts }) => {
  const sum = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map((part) => <Part key={part.id} part={part}/>)
      }
    </>
  )
}

const Course = ({ course }) => 
  <div>
    <CourseHeader course={course} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>

export default Course