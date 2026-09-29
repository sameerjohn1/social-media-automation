import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware.js";
import { Account } from "../models/Account.js";

// Get all accounts
export const getAccounts=async(req:AuthRequest,res:Response):Promise<void>=>{
    try {
   const accounts= await Account.find({user:req.user._id});
   res.json(accounts) 
    } catch (error:any) {
        res.status(500).json({message:error?.message || "Server error"})
    }
}

