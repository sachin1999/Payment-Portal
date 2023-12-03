import mongoose from "mongoose";
import { instance } from "../server.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import { Payment } from "../models/paymentModel.js";
import crypto from "crypto";
import { validateWebhookSignature,validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { query } from "express";
dotenv.config();
const key = process.env.RAZORPAY_API_KEY;
const secret_key = process.env.RAZORPAY_API_SECRET;
export const checkout = async(req,res) => {
    const { applicationNo, amount } = req.body;
    // if (!applicationNo || !amount) {
    //   return res.status(400).json({ error: "Invalid input data" });
    // }
    const options = {
    amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
    currency: "INR",
    receipt: applicationNo,
   };
   const order = await instance.orders.create(options) 
   res.status(200).json({
    success : true,
    order, 
   });
}
export const paymentVerification = async(req,res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    const { applicationNo,amount } = req.query;

    const instance = new Razorpay({ key_id: key, key_secret: secret_key });    
    validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": 
    razorpay_payment_id }, razorpay_signature, secret_key);
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto.createHmac("sha256", secret_key)
    .update(body.toString())
    .digest("hex");


    if (generated_signature == razorpay_signature) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        applicationNo
      })
      res.redirect(`http://localhost:5173/paymentsuccess?order_id=${razorpay_order_id}&transaction_id=${razorpay_payment_id}&applicationNo=${applicationNo}&amount=${amount}`) 
      
  };
}