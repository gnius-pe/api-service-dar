import User from "../models/user.model.js"
import bvrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js"

export const register = async (req, res) =>{
    const {email, password, username} = req.body
    
    try{
        const passwordHash = await bvrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })
    
        const userSaved = await newUser.save();
        const token = await createAccessToken({id:userSaved._id});
        res.cookie('token',token)
     
        res.json({
            id:userSaved._id,
            username : userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        })
   
    }catch(error){
        res.status(500).json({message: error.message})
    }
    
}

export const login = (req, res) =>{
    res.send("login");
}