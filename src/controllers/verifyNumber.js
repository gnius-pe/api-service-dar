import twilio from 'twilio';
import {
        TWILIO_ACCOUNT_SID, 
        TWILIO_AUTH_TOKEN,
        TWILIO_SERVICE_SID
        } from "../config.js";

const clientTwilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const verifyPhoneNumber = async (req,res) =>{
    try {
        const {number} = req.body;
        const {status} = await clientTwilio.verify.v2
                                .services(TWILIO_SERVICE_SID)
                                .verifications
                                .create(
                                    {
                                        to:number,
                                        channel:'sms'
                                    }
                                );
        res.json({ 
            "status" : status
        });
    } catch (error) {
        console.log(error)
    }
}

export const checkPhoneNumber = async (req,res) =>{
    try {
        const {number, code} = req.body;
        const {status} = await clientTwilio.verify.v2
                                    .services(TWILIO_SERVICE_SID)
                                    .verificationChecks
                                    .create(
                                        {
                                            to:number,
                                            code
                                        }
                                    );
        if(status==="approved"){
            res.json({status});
        }else{
            res.status(401).json({status:"Invalid"});
        }    
    } catch (error) {
        console.log(error);
    }
}