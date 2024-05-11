import twilio from 'twilio';
import {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID} from "../config.js"; 

const clientTwilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const verifyPhoneNumber = async (req,res) =>{
    try {
        const {number} = req.body;
        const countryCode = '+51';
        const responseVerify = await clientTwilio.verify.v2
                                .services(TWILIO_SERVICE_SID)
                                .verifications
                                .create({
                                        to: countryCode + number,
                                        channel:'sms'
                                });
        res.json({ 
            "status" : responseVerify.status
        });
    } catch (error) {
        res.status(error.status).json({
            "error" : "error when verifying the number",
            "details" : error.moreInfo
        })
        console.log(error)
    }
}

export const checkPhoneNumber = async (req,res) =>{
    const {number, code} = req.body;
    const countryCode = '+51';
    /*
    const regexNumber = /^[0-9]{9}$/;
    
    try { 
        if(!regexNumber.test(number)){
            res.status(400).json({
                "status" : "number invalid"
            })
        }
        
        const regexCode = /^[0-9]{6}$/;
        if(!regexCode.test(code)){
            res.status(400).json({
                "status" : "code invalid"
            })
        }
           
    } catch (error) {
        console.log(error);
        res.status(404).json({status:"number invalid"});
    }
    */
    try {
        const responseVeryfyCode = await clientTwilio.verify.v2
                                    .services(TWILIO_SERVICE_SID)
                                    .verificationChecks
                                    .create(
                                        {
                                            to:countryCode + number,
                                            code
                                        }
                                    );
        if(responseVeryfyCode.status==="approved"){
            res.status(200).json({"status" : responseVeryfyCode.status});
        }else{ 
            res.status(401).json({status:"Invalid"});
        }

    } catch (error) {
        res.status(error.status).json({
            "error" : "error when verifying the number",
            "details" : error.moreInfo
        })
        console.log(error)
    }    
     /*
    if(regexNumber.test(number) && regexCode.test(code)){
        
    }else{
        res.status(404).json({status:"number invalid"});
    }
    */
}