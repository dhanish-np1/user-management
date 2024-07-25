import express from "express";
import { fetchData } from "../controllers/adminControllers.js";

const adminRouter=express.Router()


adminRouter.get('/getData',fetchData)



export default adminRouter;