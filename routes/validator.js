const {body, validationResult} = require('express-validator');
const contactValidationRules = () => {
    return [
        body('email').isEmail(),
        body('birthday').trim().isDate().withMessage('Must be a valid date :)'),
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next;
    }
    const extractedErrors = [];
    errors.array().map( err => extractedErrors.push( {[err.param] : err.msg}));
    return res.status(422).json( {errors : extractedErrors, });
};

module.exports = { contactValidationRules, validate }