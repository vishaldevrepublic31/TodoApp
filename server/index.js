import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import todoRoute from './routes/todo.js'
import connectDB from './config/db.js'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

connectDB()
app.use(express.json())
app.use(cors())

app.use('/api/v1/todo' , todoRoute)
app.use(morgan('dev'))

app.get('/',(req,res)=>{
    res.send('Surver On') 
})



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})

