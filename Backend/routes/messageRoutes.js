import express from "express";
import { protectRoute } from "../middleware/auth.js";

import {
  getMessages,
  getUsersForSlidebar,
  markMessageAsSeen,
  sendMessage
} from "../controller/messageController.js";

const rashi = express.Router();

rashi.get("/users",protectRoute , getUsersForSlidebar);
rashi.get("/:id", protectRoute , getMessages);
rashi.put("/mark/:id", protectRoute ,markMessageAsSeen);
rashi.post("/send/:id", protectRoute,sendMessage);

export default rashi;
