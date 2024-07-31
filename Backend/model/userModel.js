import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile:{
      type:String,
      default:'profile.png'
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
