import MisionModel from "../models/mision.model.js";
//import {parseStandardDate, parseStandardClient} from "../libs/validations.js";

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
    const {
        nameMision, 
        description, 
        stateMison, 
        startDate, 
        finalDate, 
        nationality, 
        department, 
        district
    } = req.body;
    try {

        const newMision = new MisionModel({
            nameMision,
            description,
            startDate,
            finalDate,
            stateMison,
            nationality, 
            department, 
            district
        });
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
        res.status(200).json(mision);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"error" : error.message})
    }
};


export const getMisions = async (req,res) => {
    try {
        // Obtener los parámetros de paginación desde la solicitud
        const page = parseInt(req.query.page) || 1; // Página actual, por defecto es 1
        const limit = parseInt(req.query.limit) || 10; // Número de documentos por página, por defecto es 10

        // Configurar las opciones de paginación
        const options = {
            page: page,
            limit: limit
        };

        // Usar paginate para obtener los datos paginados
        const misions = await MisionModel.paginate({}, options);

        // Mapear los documentos para formatear las fechas
        /**
        const formattedDocs = misions.docs.map(mission => {
            const missionObj = mission.toObject();
            return {
                ...missionObj, // Spread the document properties
                startDate: parseStandardClient(missionObj.startDate),
                finalDate: parseStandardClient(missionObj.finalDate)
            };
        });

        // Construir la respuesta incluyendo la información de paginación
        const response = {
            docs: formattedDocs,
            totalDocs: misions.totalDocs,
            limit: misions.limit,
            totalPages: misions.totalPages,
            page: misions.page,
            pagingCounter: misions.pagingCounter,
            hasPrevPage: misions.hasPrevPage,
            hasNextPage: misions.hasNextPage,
            prevPage: misions.prevPage,
            nextPage: misions.nextPage
        };
 */
        // Enviar la respuesta
        res.status(200).json(misions);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: error.message });
    }
    /**
    const misions = await MisionModel.find();
    let formatMisions = misions.map(mission => {
        let missionObj = mission.toObject();
        missionObj.startDate = parseStandardClient(mission.startDate);
        missionObj.finalDate = parseStandardClient(mission.finalDate);
        return missionObj;
    });
    res.status(200).json(formatMisions);
     */
};

export const deleteMision = async (req,res) => {
    try {
        const misionId = req.params.id;
        const mision = await MisionModel.findByIdAndDelete(misionId);
        if(!mision) return res.status(404).json({message: 'mision no found'});
        /*
        let misionFormat = mision.toObject();
        misionFormat.startDate = parseStandardClient(misionFormat.startDate);
        misionFormat.finalDate = parseStandardClient(misionFormat.finalDate);
        */
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
    const {nameMision, description, stateMison,startDate, finalDate, nationality, 
        department, 
        district} = req.body;
    try {
        const misionId = req.params.id;
        const newtMision = await MisionModel.findByIdAndUpdate(misionId,{
            nameMision,
            description,
            startDate,
            finalDate,
            stateMison,
            nationality, 
            department, 
            district
        },{ 
            new : true
        });
        if(!newtMision)return res.status(404).json({
            message: 'Mision no found'
        });
        //let misionFormat = newtMision.toObject();
        res.status(200).json({
            "message" : "update mision",
            "mision" : newtMision
        });
    } catch (error) {
        res.status(400).json({"error" : error.message});
    }
};