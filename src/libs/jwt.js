import { TOKEN_SECRET_SERV_DAR } from "../config.js";
import jwt  from "jsonwebtoken";

export function createAccessToken (payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            TOKEN_SECRET_SERV_DAR,
            {
                expiresIn:"1d",
            },
            (err,token)=>{
                if(err) reject(err);
                resolve(token)
            }
        );
    });
}