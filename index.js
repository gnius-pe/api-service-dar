import app from "./src/app.js"
import {connectDB} from "./src/db.js"
import  'dotenv/config';

const puerto = process.env.PORT;

connectDB();
app.listen(puerto);

console.log('server on port',puerto)