import { Router } from "express";

import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
} from "../controllers/room.js";
import roomAccess from "../middleware/accessControl/room/roomAccess.js";
import auth from "../middleware/auth.js";
import checkAccess from "../middleware/checkAccess.js";

const roomRoute = Router();

roomRoute.get("/", getRooms);
roomRoute.post("/create", auth, createRoom);
roomRoute.patch("/:roomId", auth, checkAccess(roomAccess.update), updateRoom);
roomRoute.delete("/:roomId", auth, checkAccess(roomAccess.delete), deleteRoom);
export default roomRoute;
