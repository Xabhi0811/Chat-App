 import express from "express"
import { checkAuth, Login, Sign, updateProfile } from "../controller/userController.js"
import {protectRoute } from "../middleware/auth.js";


const router = express.Router()

router.post("/signup", Sign)
router.post("/login" , Login)
router.put("/update-profile" ,protectRoute , updateProfile)
router.get("/check" , protectRoute , checkAuth)

export default router;