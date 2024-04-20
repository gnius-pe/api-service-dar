import { Router } from "express";
import { verifyPhoneNumber,checkPhoneNumber } from "../controllers/verifyNumber.js";

const router = Router();

router.post('/verify',verifyPhoneNumber);
router.post('/check', checkPhoneNumber);

export default router;