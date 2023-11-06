import mongoose from "mongoose";
import  'dotenv/config';

export const connectDB = async() =>{
    try{
        const urlDB = process.env.URL;
        await mongoose.connect(urlDB);
        console.log(">>> DB connected")
    }catch (error){
        console.log(error)
    }
}