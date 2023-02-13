import { Router } from "express";
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateProfile,
  updateStatus,
} from "../controllers/user.js";
import userAccess from "../middleware/accessControl/user/userAccess.js";
import auth from "../middleware/auth.js";
import checkAccess from "../middleware/checkAccess.js";

const userRoute = Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.patch("/updateProfile", auth, updateProfile);
userRoute.get("/", auth, checkAccess(userAccess.listUsers), getUsers);
userRoute.patch(
  "/updateStatus/:userId",
  auth,
  checkAccess(userAccess.updateStatus),
  updateStatus
);
userRoute.delete(
  "/:userId",
  auth,
  checkAccess(userAccess.updateStatus),
  deleteUser
);

export default userRoute;
