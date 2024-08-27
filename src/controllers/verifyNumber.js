import { verifyPhoneNumberService, checkPhoneNumberService } from "../service/verifyNumber.service.js";
import httpResponses from "../utils/httpResponses.js";

export const verifyPhoneNumber = async (req,res) =>{
    try {
        const { number } = req.body;
        const response = await verifyPhoneNumberService(number);
        res.status(httpResponses.OK.status).json(response);
    } catch (error) {
        res.status(error.status || httpResponses.INTERNAL_SERVER_ERROR.status).json({
            error: error.message,
            details: error.details
        });
    }
}

export const checkPhoneNumber = async (req,res) =>{
    try {
        const { number, code } = req.body;
        const response = await checkPhoneNumberService(number, code);
        if (response.status === "approved") {
            res.status(httpResponses.OK.status).json(response);
        } else {
            res.status(httpResponses.UNAUTHORIZED.status).json({ status: "Invalid" });
        }
    } catch (error) {
        res.status(error.status || httpResponses.INTERNAL_SERVER_ERROR.status).json({
            error: error.message,
            details: error.details
        });
    }
}