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

export const login = async (req, res) =>{
    const {email, password} = req.body
    try{
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({
            message: "user not found"
        })
        const isMatch = await bvrypt.compare(password,userFound.password);
        if(!isMatch) return res.status(400).json({
            message: "Incorrect password"
        }) 
        const token = await createAccessToken({id:userFound._id});
        res.cookie('token',token)
        res.json({
            id:userFound._id,
            username : userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        })
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const logout = (req,res) => {
    res.cookie('token',"",{
        expires : new Date(0)
    })
    return res.sendStatus(200)
}