import { Router } from "express";
import {quotasBySpecialty} from "../controllers/reportBySpecialty.controller.js";

const router = Router();

router.get('/report/specialty', quotasBySpecialty);


export default router;