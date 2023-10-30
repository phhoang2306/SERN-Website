import express from  "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from "./config/connectDB";
require('dotenv').config();
import cors from 'cors';

let app = express()
app.use(cors({origin: true}));
//Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

viewEngine(app);
initWebRoutes(app);
connectDB();

// Listen at port in env 
let port = process.env.PORT || 2306;
app.listen(port, () => {
    console.log('Backend is running on the port '+ port)
})