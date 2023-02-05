import { Router } from "express";
import { login, register, updateProfile } from "../controllers/user.js";
import auth from "../middleware/auth.js";



const userRoute = Router();

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.patch('/updateProfile',auth,updateProfile)

export default userRoute