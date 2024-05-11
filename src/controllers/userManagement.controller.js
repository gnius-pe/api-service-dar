import bvrypt from "bcryptjs";
import UserModel from "../models/user.model.js"

export const createUser = async (req,res) => {
    const {email, password, username, role, specialty} = req.body;
    try {
        const pasdwordHash = await bvrypt.hash(password,10);
        const newUser = new UserModel({
            username,
            email,
            password: passwordHash,
            role,
            specialty
        });
        const userSaved = await newUser.save();
        if(!userSaved) return res.status(400).json({
            message: "user not save"
        });
        res.json({userSaved});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getUser = async (req,res) => {
    try {
        const userId = req.params.id;
        const userCurrent = await UserModel.findById(userId);  
        if(!userCurrent) return res.status(404).json({message:"Mision no found"});
        res.status(200).json({userCurrent});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getUserAll = async (req,res) => {
    const userAll = await UserModel.find();
    res.json(userAll);
}

export const updateUser = async (req,res) => {
    res.json({message : "put user"});
};

export const deleteUser = async (req,res) => {
    res.json({message : "delete user"});
};
