const express = require('express');
const router = express.Router();
const contacts = require('./contacts');

router.get('/', (req, res) => {
    res.send('Hellows');
});

router.use('/contacts', contacts);

module.exports = router;