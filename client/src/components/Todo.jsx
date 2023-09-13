import React from 'react'
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm'

function Todo() {
  return (
    <div>
      <AddTodoForm />
       <TodoList />
    </div>
  )
}

export default Todo