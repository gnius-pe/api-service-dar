# Contribuir a Service-DAR

¡Gracias por tu interés en contribuir a Service-DAR! Valoramos y apreciamos la contribución de la comunidad. Antes de comenzar, por favor toma un momento para revisar las siguientes pautas y recomendaciones.

[![flujo-de-trabajo-P-gina-2.png](https://i.postimg.cc/SK2BrVQk/flujo-de-trabajo-P-gina-2.png)](https://postimg.cc/FfvCFyJB)

## Cómo Contribuir

1. **Forkea el Repositorio:** Haz clic en el botón "Fork" en la parte superior de esta página para crear una copia de este repositorio en tu cuenta de GitHub.

2. **Clona tu Repositorio Forkeado:** Clona el repositorio que forkeaste a tu máquina local.
3. **Instalar Dependencias:** Instala las dependencias del proyecto definidas en el archivo package.json.
     ```bash
     npm install
     ```
4. **Ejecutar la Aplicación:** Una vez que se hayan instalado las dependencias, ejecuta la aplicación utilizando el comando definido en el archivo package.json.
      ```bash
      npm run dev
      ```

## Ejecutar en docker

1. **Comando para construir la imagen** 
      ```bash
      docker build -t dar-service-auth-patient .
      ```

2. **Comando para ejecutar el contenedor** 
      ```bash
      docker run -d --name dar-service-auth-patient-container -p 3000:3000 dar-service-auth-patient
      ```

Esto ejecutará la aplicación Node.js. Abre tu navegador web y navega a la dirección en la que se ejecuta la aplicación (http://localhost:3000). 


---

© 2024 [CODE GNIUS](https://github.com/gnius-pe). Todos los derechos reservados.

Este proyecto está alojado en el repositorio [dar-service-auth-patient](https://github.com/gnius-pe/api-service-dar). El uso del código y los recursos de este proyecto están sujetos a los términos de la licencia [Licencia MIT](./LICENSE).