 import express from "express"
import { checkAuth, Login, Sign, updateProfile } from "../controllers/userController.js";

import { protecRoute } from "../middleware/auth"

const router = express.Router()

router.post("/signup", Sign)
router.post("/login" , Login)
router.put("/update-profile" , protecRoute , updateProfile)
router.get("/check" , protecRoute , checkAuth)

export default router;