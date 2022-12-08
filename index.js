require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 4000;
const startApp = require('./src/app')

const app = express();


startApp(app);

app.listen(PORT, () => {
    console.log('app is stating on port:4000');
})