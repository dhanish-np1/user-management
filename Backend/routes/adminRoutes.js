import express from "express";
import { uploadOptions } from "../midleware/multer.js";
import {
  fetchData,
  adminSignIn,
  signOut,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/adminControllers.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminSignIn);
adminRouter.get("/getData", fetchData);
adminRouter.get("/signOut", signOut);
adminRouter.post("/create", createUser);
adminRouter.post("/edit",uploadOptions.single('images'),updateUser);
adminRouter.post("/delete/:id",deleteUser)

export default adminRouter;
