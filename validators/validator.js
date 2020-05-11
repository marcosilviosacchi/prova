
const { body } = require('express-validator');

exports.validate = [
    body('user').not().isEmpty().withMessage('scrivi user')
]