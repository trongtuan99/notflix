import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import authRouter from './routes/auth.js'
import userRouter from './routes/users.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

const port = process.env.PORT || 5000 

mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true
}).then(( ) => {
  console.log("Conected mongodb");

  app.use('/api/auth', authRouter)
  app.use('/api/users', userRouter)

  app.listen(port, () => {
    console.log(`server start on port: ${port}`);
  })
}).catch((err) => {
  console.log({err});
  process.exit(1)
})