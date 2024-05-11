import MisionModel from "../models/mision.model.js";

export const createMision = async (req,res) => {
    const requestMision = req.body;
    try {
        const newMision = new MisionModel(requestMision);
        const saveMision = await newMision.save();
        res.status(200).json(saveMision);
    } catch (error) {
        console.error('Error al guardar :' + error);
        res.status(500).json({
            message:'Error al guardar :' + error
        });
    }
};

export const getMision = async (req,res) => {
    try {
        const misionId = req.params.id;
        const mision = await MisionModel.findById(misionId);  
        if(!mision) return res.status(404).json({message:"Mision no found"});
        res.status(200).json({mision});
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }
};

export const getMisions = async (req,res) => {
    const misions = await MisionModel.find();
    res.status(200).json({misions})
};

export const deleteMision = async (req,res) => {
    try {
        const misionId = req.params.id;
        const mision = await MisionModel.findByIdAndDelete(misionId);
        console.log(mision);
        if(!mision) return res.status(404).json({message: 'mision no found'});
        res.json({
                message: 'delete object',
                "mision": mision
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"error" : error.message});
    }
};

export const updateMision = async (req,res) => {
    try {
        const updateMision = req.body;
        const misionId = req.params.id;
        const newtMision = await MisionModel.findByIdAndUpdate(misionId,updateMision,{
            new : true
        });
        if(!newtMision)return res.status(404).json({
            message: 'Mision no found'
        });
        res.status(200).json({
            "message" : "update mision",
            "mision" : newtMision
        });
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
};