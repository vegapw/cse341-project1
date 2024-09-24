const express = require('express');
const app = express();
const routes = require('./routes');
const mongoDB = require('./data/database');
const e = require('express');


const port = process.env.PORT || 3000;

app.use('/', routes);


mongoDB.initDB((err) => {
    if (err){
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Running on port: ${port}`);
        });
    }
});