import express from "express";
import { signUp,signIn } from "../controllers/userControllers.js";
const userRouter=express.Router()

userRouter.post('/sign-up',signUp)
userRouter.post('/sign-in',signIn)


export default userRouter;