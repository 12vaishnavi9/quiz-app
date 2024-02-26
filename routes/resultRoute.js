import express from "express";
import {insertResult,getResult } from "../controllers/resultController.js";
const router=express.Router();

router.get('/result',getResult);
router.post('/insert-result',insertResult);

export default router;