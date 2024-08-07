import express from 'express';
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import patientRouter from "./routes/patient.routes.js";
import verifiNumberRouter from "./routes/verifyNumber.routes.js";
import misionRouter from "./routes/mision.routes.js";
import userRouter from "./routes/userManagement.routes.js";
import specialtyRouter from "./routes/specialty.routes.js";
import reportByDashboard from "./routes/reportByDashboard.routes.js";
import cors from "cors";
import { CLIENT_URL, DEV_URL, CLIENT_URL_DAR , CLIENT_CONTAINER} from './config.js';

const app = express();

app.use(cors({
    origin:[DEV_URL,CLIENT_URL,CLIENT_URL_DAR,CLIENT_CONTAINER],
    credentials:true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api',authRoutes);
app.use('/api',patientRouter);
app.use('/api/v1',verifiNumberRouter);
app.use('/api',misionRouter);
app.use('/api',userRouter);
app.use('/api',specialtyRouter);
app.use('/api',reportByDashboard);

export default app;