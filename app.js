const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoDB = require('./data/database');


const port = process.env.PORT || 3000;

app .use(bodyParser.json())
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