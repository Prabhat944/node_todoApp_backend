import express from 'express';
import userRouter from "./routes/userRoute.js";
import todoRouter from './routes/todoRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { nextErrorHandler } from './middlewares/errorHandler.js';

export const app = express();

app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/todo",todoRouter);

app.get('/',(req,res)=>{
    res.send("<h1>Server is running!!!</h1>")
})


app.use(nextErrorHandler);