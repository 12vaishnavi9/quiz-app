import express from "express";
import {requireSignIn} from "../middlewares/authMiddleware.js";
import { answersController,getAnswers } from "../controllers/userAnswerController.js";
const router=express.Router();

router.post('/answer',answersController);
router.post('/get-answers',getAnswers)

export default router;