import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fName: {
      type: String,
      min: 2,
      max: 50,
      required: true,
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
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    photoURL: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "basic",
      //to specify which values are allowed
      enum: ["basic", "editor", "admin"],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
