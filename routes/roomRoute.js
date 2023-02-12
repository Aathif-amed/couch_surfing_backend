import { Router } from "express";

import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.js";
import auth from "../middleware/auth.js";

const roomRoute = Router();

roomRoute.get("/", getRooms);
roomRoute.post("/create", auth, createRoom);
roomRoute.patch("/:roomId", updateRoom);
roomRoute.delete("/:roomId", deleteRoom);
export default roomRoute;
