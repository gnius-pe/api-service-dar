
export const validateschema = (schema) => (req,res,next)  => {
    try{    
        schema.parse(req.body); 
        next();
    } catch(error){
        return res.status(400).json({error : error.errors.map((error)=>error.message)});
    }
};

export const validateAdmin = (user) => (req,res,next) =>{
    try {
        console.log(user);
    } catch (error) {
        console.log(errro.message);
    }
}