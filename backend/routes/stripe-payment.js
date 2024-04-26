import express from "express";
import { stripePayment } from "../controller/stripePayment.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-payment-intent", stripePayment);

export default paymentRouter;
