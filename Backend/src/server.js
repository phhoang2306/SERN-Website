import express from  "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from "./config/connectDB";
//import cors from 'cors'
require('dotenv').config();

let app = express();    
//Config app
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));
//app.use(cors({ credentials: true, origin: true }))
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT) // Allow access from link
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Method allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
viewEngine(app);
initWebRoutes(app);
connectDB();

// Listen at port in env 
let port = process.env.PORT || 2306;
app.listen(port, () => {
    console.log('Backend is running on the port '+ port)
})