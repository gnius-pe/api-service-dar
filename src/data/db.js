import mongoose from "mongoose";
import {URL_BD} from "../config.js";

export const connectDB = async() =>{
    try{
        await mongoose.connect(URL_BD);
        console.log(">>> DB connected")
    }catch (error){
        console.log(error)
    }
}