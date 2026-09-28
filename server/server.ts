import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

// database connection
await connectDb()

// Middleware
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/auth",authRouter)


// Global Error handler
app.use((err:any,_req:Request,res:Response,_next:NextFunction)=>{
    console.error(err);
    res.status(500).send(err?.res?.data?.message||err?.message)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});