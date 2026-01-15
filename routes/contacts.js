const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacts');
const { contactsValidationRules, validate } = require('./validator');

router.get('/', controller.getAll);

router.get('/:id', controller.getContactById);

//router.post('/', contactsValidationRules, validate, controller.createContact);

//router.put('/:id', contactsValidationRules,validate ,controller.updateContact);

//router.delete('/:id', controller.deleteContact);

module.exports = router;