// src/controllers/apiController.js
exports.getData = (req, res) => {
    // Manejar la lógica para obtener datos aquí
    const data = { idPersona: 1,
                    nombre : 'Pedro',
                    apellidos : 'Cantaro J',
                    edad : 23
                  };
    res.json(data);
  };
  