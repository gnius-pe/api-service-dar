import User from "../models/user.model.js"
import {loginUserService} from "../service/auth.service.js";

export const register = async (req, res) =>{
    try {
        const { 
            email, 
            password, 
            username, 
            role, 
            specialty } = req.body;

        const userData = await registerUserService({ 
            email, 
            password, 
            username, 
            role, 
            specialty });

        res.cookie('token', userData.token);
        res.status(httpResponses.OK.status).json({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            specialty: userData.specialty,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        });
    } catch (error) {
        res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
            message: error.message
        });
    }
}

export const login = async (req, res) =>{  
    try{
        const {email, password} = req.body
        const userData = await loginUserService({email,password});
        res.cookie('token',userData.token);
        res.status(httpResponses.OK.status).json({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            specialty: userData.specialty,
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
        });
    }catch(error){
        res.status(httpResponses.BAD_REQUEST.status).json({
            message: error.message
        });
    }
}

export const logout = (req,res) => {
    res.cookie('token',"",{
        expires : new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req,res) => {
    const userFound = await  User.findById(req.user.id)
    if(!userFound) return res.status(400).json({
        message: "User not found"
    });
    return res.json({
        id:userFound._id,
        username : userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
}