import Admin from "../model/adminModel.js";
import User from "../model/userModel.js";


export const adminSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "user Not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "wrong password or email"));
    }
    const token = jwt.sign({ id: validUser._id }, "dfdsfsdfsdfdfdsfhhjhgs");
    console.log(token);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = 24 * 60 * 60 * 1000;

    res
      .cookie("access_token", token, {
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
      console.log("data==::>",data);
      res.json({userData:data})
  } catch (error) {
      console.log(error);
  }
} 