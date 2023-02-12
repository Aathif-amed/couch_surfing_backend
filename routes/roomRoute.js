import { Router } from "express";

import { createRoom, deleteRoom, getRooms } from "../controllers/room.js";
import auth from "../middleware/auth.js";

const roomRoute = Router();

roomRoute.post("/create", auth, createRoom);
roomRoute.get("/", getRooms);
roomRoute.delete("/:roomId", deleteRoom);
export default roomRoute;
