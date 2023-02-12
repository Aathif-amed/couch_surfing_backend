import { Router } from "express";
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateProfile,
  updateStatus,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.patch("/updateProfile", auth, updateProfile);
userRoute.get("/", getUsers);
userRoute.patch("/updateStatus/:userId", updateStatus);
userRoute.delete("/:userId", deleteUser);

export default userRoute;
