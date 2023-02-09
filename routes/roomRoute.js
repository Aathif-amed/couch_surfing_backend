import { Router } from "express";

import { createRoom, getRooms } from "../controllers/room.js";
import auth from "../middleware/auth.js";

const roomRoute = Router();

roomRoute.post('/create',auth,createRoom)
roomRoute.get('/',getRooms)
export default roomRoute