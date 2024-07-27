import { Router } from "express";
import {quotasBySpecialty} from "../controllers/reportBySpecialty.controller.js";

const router = Router();

router.get('/report/:nameSpecialty', quotasBySpecialty);


export default router;