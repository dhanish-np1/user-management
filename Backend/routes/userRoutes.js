import express from "express";
import { signUp,signIn,updateProfile,signOut } from "../controllers/userControllers.js";
import { verifyToken } from "../utils/verifyUser.js";
import { uploadOptions } from "../midleware/multer.js";

const userRouter=express.Router()

userRouter.post('/sign-up',signUp)
userRouter.post('/sign-in',signIn)
userRouter.post('/update/:id',verifyToken,uploadOptions.single('images'),updateProfile)
userRouter.get('/signOut',signOut)


export default userRouter;