import app from "./src/app.js";
import {connectDB} from "./src/data/db.js";
import  {PORT_SERVICE} from "./src/config.js";
import { swagggerJSDocs } from "./src/libs/swagger.js";
import figlet from "figlet";

connectDB();
app.listen(PORT_SERVICE);
swagggerJSDocs(app,PORT_SERVICE);
figlet('    Gnius Code',(err,result)=>{
    console.log(err || result);
});

console.log('server on port',PORT_SERVICE);