# Utiliza la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /app

# Copia los archivos del proyecto al directorio de trabajo
COPY package.json .

# Instala las dependencias del proyecto
RUN npm install

COPY . .

RUN npm run build

# Expone el puerto en el que se ejecuta tu aplicación (por ejemplo, el puerto 8080)
EXPOSE 8080

# Comando para ejecutar la aplicación (ajusta esto según cómo inicies tu proyecto)
CMD ["npm", "run","start"]
