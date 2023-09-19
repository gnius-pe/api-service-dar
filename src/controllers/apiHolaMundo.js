exports.getData = (req,res) => {
    const data = {mensaje : 'Hola Mundo con Node js y Express :'}
    res.json(data);
}