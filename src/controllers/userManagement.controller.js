import bvrypt from "bcryptjs";
import UserModel from "../models/user.model.js"
import {parseStandardClient} from "../libs/validations.js";

export const createUser = async (req,res) => {
    const {
        numberIdentification,
        name,
        lastName,
        birthDate,
        firtsNumberPhone, 
        secondNumberPhone,
        sexo, 
        email,  
        role, 
        specialty
    } = req.body;
    const firtsName = name.split(/\s+/)[0].toLowerCase();
    const fitsLastName = lastName.split(/\s+/)[0].toLowerCase();
    try {
        const pasdwordHash = await bvrypt.hash(numberIdentification,10);
        const newUser = new UserModel({
            numberIdentification,
            name,
            lastName,
            birthDate,
            firtsNumberPhone, 
            secondNumberPhone,
            sexo,
            username : name + numberIdentification, 
            email,
            organizationEmail : firtsName+"."+fitsLastName+"@DAR.or", 
            password: pasdwordHash, 
            role, 
            specialty
        });
        const userSaved = await newUser.save();
        if(!userSaved) return res.status(400).json({
            message: "user not save"
        });
        res.json({
            "_id" : userSaved.id,
            "role" : userSaved.role,
            "specialty" : userSaved.specialty,
            "email" : userSaved.organizationEmail,
            "password" : numberIdentification
        });
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
