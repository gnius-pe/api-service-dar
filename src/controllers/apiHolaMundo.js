exports.getData = (req,res) => {
    const data = {mensaje : 'Hola Mundo con Node js y Express :3 .'}
    res.json(data);
}