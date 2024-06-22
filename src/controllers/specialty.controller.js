import SpecialtyModel from "../models/specialty.model.js";

export const createSpecialty = async (req,res) => {
    try {
        const {specialtyName, description, code} = req.body;
        const newSpecialty = new SpecialtyModel({
            specialtyName, 
            description, 
            code
        });
        const saveSpecialty = await newSpecialty.save();
        res.status(200).json(saveSpecialty); 
    } catch (error) {
        console.error('Error al guardar :' + error);
        res.status(500).json({
            message:'Error al guardar :' + error
        }); 
    }
    
}

export const getSpecialty = async (req,res) => {
    try {
        const specialtyId = req.params.id; 
        const specialty = await SpecialtyModel.findById(specialtyId);
        if(!specialty) return res.status(404).json({message:"specialty no found"});
        res.status(200).json(specialty);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }
    
}

export const getSpecialties = async (req,res) => {
    try {
        const specialties = await SpecialtyModel.find();
        if(!specialties) return res.status(404).json({message:"The resource was not found"});
        res.status(200).json(specialties);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }
}

export const deletetSpecialty = async (req,res) => {
    try {
        const specialtyId = req.params.id;
        const specialtyDelete = await SpecialtyModel.findByIdAndDelete(specialtyId);
        if(!specialtyDelete) return res.status(404).json({message: 'specialty no found'});
        res.status(200).json('ok');
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    } 
}

export const updateSpecialty = async (req,res) => {
    try {
        const specialtyId = req.params.id;
        const {specialtyName, description, code} = req.body;
        const updateSpecialty = await SpecialtyModel.findByIdAndUpdate(specialtyId,{
            specialtyName, 
            description, 
            code
        },{
            new:true
        });
        if(!updateSpecialty)return res.status(404).json({
            message: 'specialty no found update'
        });
        res.status(200).json(updateSpecialty); 
    } catch (error) {
        console.error('Error al guardar :' + error);
        res.status(500).json({
            message:'Error al guardar :' + error
        }); 
    } 
}