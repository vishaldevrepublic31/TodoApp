import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const TodoContext = createContext()

export const  TodoContextProvider = ({children})=>{
    const [todos , setTodos] = useState([])
    const [finishedTodos ,setFinishedTodos] = useState([])
    const [pageNumber , setPageNumber] = useState(1)
    const [finishedPageNumber , setFinishedPageNumber] = useState(1)
    const [results,setResults] = useState('')
    const [finishedResults,setFinishedResults] = useState('')
    async function getTodos (){
        const res = await axios.get(`/api/v1/todo/todos?page=${pageNumber}&limit=5`)
        setTodos(res.data.todos.results.reverse())
        setResults(res.data.todos)
        console.log(res.data.todos)
      }
      async function getFinishedTodos (){
        const res = await axios.get(`/api/v1/todo/finished-todos?page=${finishedPageNumber}&limit=5`)
        setFinishedTodos(res.data.todos.results.reverse())
        setFinishedResults(res.data.todos)
        // console.log('finished ->',res.data.todos)
      }
    useEffect(() => {
      getFinishedTodos()
      getTodos()
    }, [pageNumber,finishedPageNumber])
    return <TodoContext.Provider value={{todos,setTodos,getTodos,setPageNumber,pageNumber,results,finishedTodos,setFinishedPageNumber,finishedPageNumber,getFinishedTodos,finishedResults }} >
        {children}
    </TodoContext.Provider>
}

export const useTodo =()=>{
    const context = useContext(TodoContext);
    return context
}