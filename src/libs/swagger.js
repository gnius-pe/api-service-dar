import swagggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
    definition : {
        openapi:"3.0.0",
        info : { title: 'API DAR', version:"1.0.0"}
    },
    apis: ['src/routes/*.js','../models/user.model.js'],
};

const swaggerSpec = swagggerJSDoc(options);

export const swagggerJSDocs = (app,port) =>{
    app.use('/',swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('docs.json',(req,res) =>{
        res.setHeader('Content-Type','application/json');
        res.send(swaggerSpec);
    })
};

