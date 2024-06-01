import MisionModel from "../models/mision.model.js";
import {parseStandardDate, parseStandardClient} from "../libs/validations.js";

/**
 * if (personalInformation.birthDate) {
            const formattedBirthDate = dayjs(personalInformation.birthDate, 'DD-MM-YYYY').toISOString();
            personalInformation.birthDate = formattedBirthDate;
    } 

de entrada se recive un 01-06-2024 -> dia-mes-año
funcion que reciba un string de fecha y hora(){
    parcear al standar
    retornar
}
se debe de almacenar un 2024-06-01 -> año-mes-dia
recibir dos cosas :
    fecha : 01-02-2024
    hroa : 00:00.000Z
estandar : "2024-02-01T00:00:00.000Z"
*/
export const createMision = async (req,res) => {
    let {startDate, finalDate} = req.body;
    const {nameMision, description, stateMison} = req.body;
    const hour = "00:00:00";
    try {
        startDate = parseStandardDate(startDate,hour);
        finalDate = parseStandardDate(finalDate,hour);
        const newMision = new MisionModel({
            nameMision,
            description,
            startDate,
            finalDate,
            stateMison
        });
        const saveMision = await newMision.save();
        let resMision = saveMision.toObject();
        resMision.startDate = parseStandardClient(resMision.startDate);
        resMision.finalDate = parseStandardClient(resMision.finalDate);
        res.status(200).json(resMision);     
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

        let misionFormat = mision.toObject();
        misionFormat.startDate = parseStandardClient(misionFormat.startDate);
        misionFormat.finalDate = parseStandardClient(misionFormat.finalDate);
        res.status(200).json(misionFormat);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }
};



export const getMisions = async (req,res) => {
    const misions = await MisionModel.find();
    let formatMisions = misions.map(mission => {
        let missionObj = mission.toObject();
        missionObj.startDate = parseStandardClient(mission.startDate);
        missionObj.finalDate = parseStandardClient(mission.finalDate);
        return missionObj;
    });
    res.status(200).json(formatMisions);
};

export const deleteMision = async (req,res) => {
    try {
        const misionId = req.params.id;
        const mision = await MisionModel.findByIdAndDelete(misionId);
        if(!mision) return res.status(404).json({message: 'mision no found'});
        let misionFormat = mision.toObject();
        misionFormat.startDate = parseStandardClient(misionFormat.startDate);
        misionFormat.finalDate = parseStandardClient(misionFormat.finalDate);
        res.json({
                message: 'delete object',
                "mision": misionFormat
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({"error" : error.message});
    }
};

export const updateMision = async (req,res) => {
    let {startDate, finalDate} = req.body;
    const {nameMision, description, stateMison} = req.body;
    const hour = "00:00:00";
    try {
        startDate = parseStandardDate(startDate,hour);
        finalDate = parseStandardDate(finalDate,hour);
        const misionId = req.params.id;
        const newtMision = await MisionModel.findByIdAndUpdate(misionId,{
            nameMision,
            description,
            startDate,
            finalDate,
            stateMison
        },{
            new : true
        });
        if(!newtMision)return res.status(404).json({
            message: 'Mision no found'
        });
        let misionFormat = newtMision.toObject();
        misionFormat.startDate = parseStandardClient(misionFormat.startDate);
        misionFormat.finalDate = parseStandardClient(misionFormat.finalDate);
        res.status(200).json({
            "message" : "update mision",
            "mision" : misionFormat
        });
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
};