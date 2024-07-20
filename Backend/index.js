import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
mongoose.connect('mongodb://localhost:27017/user_management').then(()=>{
    console.log('conected to mongodb');
}).catch((err)=>{
    console.log(err);
})


const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.listen(3000,()=>{
    console.log('server started in port 3000');
})

app.use('/',userRouter)

app.use((err,req,res,next)=>{
    const statusCode =err.statusCode || 500;
    const message= err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})