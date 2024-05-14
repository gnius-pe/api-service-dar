import app from "./src/app.js";
import {connectDB} from "./src/data/db.js";
import  {PORT_SERVICE} from "./src/config.js";

connectDB();
app.listen(PORT_SERVICE);

console.log('server on port',PORT_SERVICE);