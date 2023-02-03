import { Router } from "express";

import { createRoom } from "../controllers/room.js";
import auth from "../middleware/auth.js";

const roomRoute = Router();

roomRoute.post('/',auth,createRoom)

export default roomRoute