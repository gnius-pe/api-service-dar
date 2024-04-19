import { Router } from "express";
import { verifyPhoneNumber } from "../controllers/verifyNumber.js";

const router = Router();

router.post('/verify',verifyPhoneNumber);

export default router;