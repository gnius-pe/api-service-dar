// src/controllers/apiController.js
exports.getData = (req, res) => {
    // Manejar la lógica para obtener datos aquí
    const data = { idPersona: 'Esto es un ejemplo de datos JSON',
                    nombre : 'Pedro',
                    apellidos : 'Cantaro J',
                    edad : 23
                  };
    res.json(data);
  };
  