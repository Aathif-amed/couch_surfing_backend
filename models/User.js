import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 50,
      required:true,
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
      min: 8,
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
