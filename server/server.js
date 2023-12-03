import express from "express";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; 
import Razorpay from "razorpay";
import paymentRoute from "./routes/paymentRoute.js";
import { connectDB } from "./config/database.js";
import loginRoute from "./routes/loginRoute.js";
export const app = express();
dotenv.config();
connectDB();
const key = process.env.RAZORPAY_API_KEY;
const secret_key = process.env.RAZORPAY_API_SECRET;
const port = process.env.PORT || 5000;

export const instance = new Razorpay({
        key_id: key,
        key_secret: secret_key,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json()); 
 

app.listen(port, () =>
    console.log(`Server running on port ${port} 🔥`)
); 

app.use("/api", paymentRoute);
app.use("/api", loginRoute);
app.get("/api/getkey",(req,res)=>res.status(200).json({key:key}));