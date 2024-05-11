import twilio from 'twilio';
import {
        TWILIO_ACCOUNT_SID, 
        TWILIO_AUTH_TOKEN,
        TWILIO_SERVICE_SID
        } from "../config.js";
import {validateLongNumber} from "../libs/validations.js";    


const clientTwilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const verifyPhoneNumber = async (req,res) =>{
    try {
        const {number} = req.body;
        /**
        let regex = /^[0-9]{9}$/;
        if(!regex.test(number)){
            res.status(400).json({
                "status" : "number invalid"
            })
        }
        //se agrega codigo del pais,
        number = "+51" + number;
        console.log(number)
         */
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
    let {number, code} = req.body;
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

    if(regexNumber.test(number) && regexCode.test(code)){
        number = "+51" + number;
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
    }else{
        res.status(404).json({status:"number invalid"});
    }
}