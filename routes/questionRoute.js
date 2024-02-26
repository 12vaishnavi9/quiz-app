import express from "express";
import { getQuestions,insertQuestions } from "../controllers/questionController.js";
import {requireSignIn} from "../middlewares/authMiddleware.js";
const router=express.Router();

router.get('/questions',getQuestions);
router.post('/insert-question',insertQuestions);

export default router;