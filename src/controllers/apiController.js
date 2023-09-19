// src/controllers/apiController.js
exports.getData = (req, res) => {
    // Manejar la lógica para obtener datos aquí
    const data = { mensaje: 'Esto es un ejemplo de datos JSON' };
    res.json(data);
  };
  