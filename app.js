const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Puerto de escucha, puedes utilizar una variable de entorno

// Middleware para manejar JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas: Importa y usa las rutas de tu aplicación aquí
const apiRoutes = require('./src/routes/apiRoutes');
app.use('/api', apiRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
