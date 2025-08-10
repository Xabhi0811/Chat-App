 import express from 'express'
 import dotenv from 'dotenv'
 dotenv.config();
 import cors from 'http'
 import{ connectDB} from './db/db'
import userRouter from './routes/userRoutes';
import messageRouter from './routes/messageRoutes';
 

 const app = express()
 const server = http.createServer(app)
  connectDB()



 app.use(express.json({ limit: "4mb"}))
 app.use(cors())
 
 app.use('/api/status',(req, res)=> res.send("Server is live"))
 app.use("/api/auth", userRouter)
 app.use("/api/message", messageRouter)

 const PORT = process.env.PORT || 5000

 server.listen(PORT, ()=> 
    console.log("server is running on port " + PORT))