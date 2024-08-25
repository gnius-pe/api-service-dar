import UserModel from "../models/user.model.js"
import { createUserService, getAllUsersService, updateUserService } from "../service/userManagement.service.js";
import httpResponses from "../utils/httpResponses.js";

export const createUser = async (req,res) => {
    try {
        const userData = req.body;
        const userSaved = await createUserService(userData);
        res.status(httpResponses.CREATED.status).json(userSaved); 
    } catch (error) {
        res.status(httpResponses.INTERNAL_SERVER_ERROR.status).json({
            message : error.message
        })
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
    try {
        const responseUser = await getAllUsersService(req.query);
        res.status(httpResponses.OK.status).json(responseUser);
    } catch (error) {
        res.status(httpResponses.BAD_REQUEST.status).json(
            { error: error.message }
        );
    }
}

export const updateUser = async (req,res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updatedUser = await updateUserService(userId,updateData);
        res.status(httpResponses.OK.status).json(updatedUser);
    } catch (error) {
        res.status(httpResponses.BAD_REQUEST.status).json({
            message: error.message
        });
    }
};

export const deleteUser = async (req,res) => {
    res.json({message : "delete user"});
};
