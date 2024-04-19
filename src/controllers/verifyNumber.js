import twilio from 'twilio';
import {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,TWILIO_SERVICE_SID} from "../config.js";

const clientTwilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const verifyPhoneNumber = async (req,res) =>{
    try {
        const {number} = req.body;
        const responseT = await clientTwilio;
        res.json({ 
            "status" : responseT
        })
    } catch (error) {
        console.log(error);
    }

    res.json({message :'numero por verficar'});
}