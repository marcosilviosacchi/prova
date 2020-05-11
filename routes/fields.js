const express = require('express');
const router = express.Router();
const field = require('../controllers/field');

router.get('/:name',field.getByName);

module.exports = router;