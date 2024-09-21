import { getBasicResponse } from "../controllers/basicController.js";
import { Router } from "express";

const router = Router();

router.get('/basic',getBasicResponse);

export default router; 