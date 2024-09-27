const express = require('express');
const router = express.Router();
const contacts = require('./contacts');
const swagger = require('./swagger');


router.use('/', swagger);

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hellows');
});

router.use('/contacts', contacts);

module.exports = router;