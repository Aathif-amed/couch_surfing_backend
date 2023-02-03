import { Router } from "express";
import { register } from "../controllers/user.js";



const userRoute = Router();

userRoute.post('/register',register)

export default userRoute