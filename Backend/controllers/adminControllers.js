import Admin from "../model/adminModel.js";
import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const adminSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await Admin.findOne({ email });
    if (!validUser) {
      console.log('hello');
      return next(errorHandler(404, "wrong password or email"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "wrong password or email"));
    }
    const token = jwt.sign({ id: validUser._id }, "dfdsfsdfsdfdfdsfhhjhgs");
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = 24 * 60 * 60 * 1000;

    res
      .cookie("admin_access_token", token, {
        maxAge: expiryDate,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const fetchData = async (req,res)=>{
  try {
      const data = await User.find()
      res.json({userData:data})
  } catch (error) {
      console.log(error);
  }
} 


export const signOut = (req, res) => {
  res
    .clearCookie("admin_access_token", {
      httpOnly: true,
      sameSite: "None",
      path: "/",
      secure: true,
    })
    .status(200)
    .json("Signout success!");
  console.log("admin logoutedd");
};
