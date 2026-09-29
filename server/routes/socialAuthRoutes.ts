import express from "express";
import { generatedAuthUrl, syncAccounts } from "../controllers/socialAuthController.js";

const socialAuthRouter=express.Router();

socialAuthRouter.get("/:platform/url",generatedAuthUrl)
socialAuthRouter.get("/sync",syncAccounts)

export default socialAuthRouter


