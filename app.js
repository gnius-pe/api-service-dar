const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const app = express();
const port = process.env.PORT || 3000; // Puerto de escucha, puedes utilizar una variable de entorno

// Middleware para manejar JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'))
app.use(
  morgan(function (tokens, req, res) {
    return [
      chalk.blue.bold(tokens.method(req, res)),
      chalk.green.bold(tokens.status(req, res)),
      chalk.yellow(tokens.url(req, res)),
      chalk.red(tokens['response-time'](req, res) + ' ms'),
    ].join(' ');
  })
);

// Rutas: Importa y usa las rutas de tu aplicación aquí
const apiRoutes = require('./src/routes/apiRoutes');
app.use('/api', apiRoutes);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
