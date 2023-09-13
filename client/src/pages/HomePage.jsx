import React from 'react'
import Todo from '../components/Todo'

function HomePage() {
 
  
  return (
    <div className='container d-flex flex-column mt-5 '>
    <h1 className='align-self-center bg-light p-3 rounded-top'><u> TODO APP</u></h1>
    <main>
        <Todo />
    </main>
    </div>
  )
}

export default HomePage
