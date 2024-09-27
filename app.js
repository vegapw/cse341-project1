const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoDB = require('./data/database');


const port = process.env.PORT || 3000;

app .use(bodyParser.json())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', routes);


mongoDB.initDB((err) => {
    if (err){
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Running on port: ${port}`);
        });
    }
});