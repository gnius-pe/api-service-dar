import bvrypt from "bcryptjs";
import UserModel from "../models/user.model.js"
import {parseStandardClient} from "../libs/validations.js";
import { createUserService } from "../service/userManagement.service.js";
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
    /**
    const userAll = await UserModel.find();
    res.json(userAll);


 */
    try {
        const page = parseInt(req.query.page) || 1; // Página actual, por defecto es 1
        const limit = parseInt(req.query.limit) || 10;
        const options = {
            page: page,
            limit: limit
        };
        const userAll = await UserModel.paginate({}, options);
        const userAllFormat = userAll.docs.map(user => {
                const userObj = user.toObject();
                return{
                    ...userObj,
                    birthDate : parseStandardClient(userObj.birthDate)
                }
            }
        );
    
        const response = {
            docs: userAllFormat,
            totalDocs: userAll.totalDocs,
            limit: userAll.limit,
            totalPages: userAll.totalPages,
            page: userAll.page,
            pagingCounter: userAll.pagingCounter,
            hasPrevPage: userAll.hasPrevPage,
            hasNextPage: userAll.hasNextPage,
            prevPage: userAll.prevPage,
            nextPage: userAll.nextPage
        };
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
}

export const updateUser = async (req,res) => {
    res.json({message : "put user"});
};

export const deleteUser = async (req,res) => {
    res.json({message : "delete user"});
};
