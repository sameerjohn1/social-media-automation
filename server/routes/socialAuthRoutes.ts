import express from "express";
import { generatedAuthUrl, syncAccounts } from "../controllers/socialAuthController.js";
import { protect } from "../middlewares/authMiddleware.js";

const socialAuthRouter=express.Router();

socialAuthRouter.get("/:platform/url",protect ,generatedAuthUrl)
socialAuthRouter.get("/sync",protect,syncAccounts)

export default socialAuthRouter


