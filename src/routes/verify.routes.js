import { Router } from "express";
import {verifyNumberEvenOdd , grade} from "../controllers/verify.controller.js";

const router = Router();

router.get('/even-or-odd/:number',verifyNumberEvenOdd);

router.get('/grade/:score', grade);

export default router;