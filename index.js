import app from "./src/app.js";
import {connectDB} from "./src/data/db.js";
import  {PORT_SERVICE} from "./src/config.js";
import { swagggerJSDocs } from "./src/libs/swagger.js";
import figlet from "figlet";

const startServer = async () =>{
    try {
        await connectDB();
        app.listen(PORT_SERVICE,() =>{
            console.log(`Server is running on port ${PORT_SERVICE}`);
            swagggerJSDocs(app,PORT_SERVICE);
        });
        figlet('    Gnius Code',(err,result) => {
            if(err){
                console.error('Error generating ASCII art:', err);
                return;
            }
            console.log(result);
        })
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();