import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      min: 2,
      max: 50,
      required:true,
    },
    lName: {
      type: String,
      min: 2,
      max: 50,
      default: "",  
    },
    email: {
      type: String,
      min: 2,
      max: 50,
      required:true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      required:true,
    },
    photoURL: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
