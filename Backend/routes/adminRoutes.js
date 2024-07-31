import express from "express";
import { fetchData,adminSignIn,signOut } from "../controllers/adminControllers.js";


const adminRouter=express.Router()

adminRouter.post('/login',adminSignIn)
adminRouter.get('/getData',fetchData)
adminRouter.get('/signOut',signOut)




export default adminRouter;