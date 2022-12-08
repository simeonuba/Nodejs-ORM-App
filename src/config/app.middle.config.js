const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const middleware =(app) =>{
 
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors({
        origin: 'http://127.0.0.1:5500',
        optionsSuccessStatus: 200
    }))
    app.use(session({ 
        secret: '123456cat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
      }))
    app.use(helmet())
    app.use(cookieParser());
    app.set('views', path.join(__dirname, 'views/'));
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");
    app.set("view options", { layout: false } );

app.use('/static', express.static('public'));
    //app.use(csurf({cookie: true}));
}

module.exports = middleware;