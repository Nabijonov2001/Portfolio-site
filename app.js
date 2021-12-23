const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const { PORT } = require('./config');

const app = express();

// middllewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(fileUpload());
app.use(cookieParser());

// settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// all routes

fs.readdir(path.join(__dirname, 'routes'), (err, files)=>{
    if(!err){
        files.forEach(file => {
            const filePath = path.join(__dirname, 'routes', file);
            const Router = require(filePath);
            if(Router.router && Router.path){
                app.use(Router.path, Router.router);
            }
        });
    }
})

// server 
app.listen(PORT, ()=>{
    console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
})