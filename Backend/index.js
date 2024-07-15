import express from "express";
import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/user_management').then(()=>{
    console.log('conected to mongodb');
}).catch((err)=>{
    console.log(err);
})


const app=express()


app.listen(3000,()=>{
    console.log('server started in port 3000');
})
