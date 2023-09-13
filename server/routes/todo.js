import express from 'express'
import { createTodo, deleteSingleTodo, getAllTodo, getSingleTodo, updateTodo } from '../controllers/todoController.js'
import { paginatedResult } from '../middlewares/paginatedMiddleware.js'
import Todo from '../models/todo.js'

const router = express.Router()

router.get('/todos',paginatedResult(Todo,false) , getAllTodo)
router.get('/finished-todos',paginatedResult(Todo,true) , getAllTodo)
router.get('/single-todo/:id',getSingleTodo)
router.post('/create-todo',createTodo)
router.put('/update-todo/:id',updateTodo)
router.delete('/delete-single-todo/:id',deleteSingleTodo)

export default router