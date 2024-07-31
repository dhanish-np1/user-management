import User from "../model/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (
      email.trim() == "" ||
      password.trim() == "" ||
      username.trim() == "" ||
      confirmPassword.trim() == ""
    ) {
      return next(errorHandler(404, "please fill the field"));
    }
    if (username.trim().length < 2) {
      return next(errorHandler(404, "username must be more then 2 char"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return next(errorHandler(404, "Invalid email address"));
    }
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return next(errorHandler(404, "This email already exist"));
    }
    const validatePassword = (password) => {
      const minLength = 8; // Minimum length for strong password
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
      if (password.length < minLength) {
        return { valid: false, message: "Password must be at least 8 characters long." };
      }
    
      if (!hasUpperCase) {
        return { valid: false, message: "Password must contain at least one uppercase letter." };
      }
    
      if (!hasLowerCase) {
        return { valid: false, message: "Password must contain at least one lowercase letter." };
      }
    
      if (!hasDigit) {
        return { valid: false, message: "Password must contain at least one digit." };
      }
    
      if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character." };
      }
    
      return { valid: true, message: "Password is strong." };
    };
    const validation = validatePassword(password);
    if (!validation.valid) {
      return next(errorHandler(400, validation.message));
    }
    if (password !== confirmPassword) {
      return next(errorHandler(404, "password mismatch"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "user created succesfully" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email.trim() == "" || password.trim() == "") {
      return next(errorHandler(404, "please fill the field"));
    }
    const validUser = await User.findOne({ email });
    if (!validUser) {
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
      .cookie("access_token", token, {
        maxAge: expiryDate,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  if (req.body.username.trim().length < 2) {
    return next(errorHandler(404, "username must be more then 2 char"));
  }
  try {
    const updateData = {
      username: req.body.username,
    };
    if (req.file) {
      updateData.profile = req.file.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set:updateData ,
      },
      { new: true }
    );
    console.log(updatedUser);
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      sameSite: "None",
      path: "/",
      secure: true,
    })
    .status(200)
    .json("Signout success!");
  console.log("user logoutedd");
};
