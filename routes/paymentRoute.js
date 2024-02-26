import express from "express";
import {checkout,paymentVerifyController} from "../controllers/paymentController.js";
const router=express.Router();

router.post('/verify',paymentVerifyController);
router.route("/initiate").post(checkout);

export default router;