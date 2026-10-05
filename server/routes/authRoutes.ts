import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const authRouter=Router()

authRouter.post("/register",registerUser)
authRouter.post("/login",loginUser)
authRouter.post("/logout",protect,logoutUser)

export default authRouter