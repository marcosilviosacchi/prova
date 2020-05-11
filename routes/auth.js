const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const mdlVal = require('../middleware/mdlVal');

router.post('/login',mdlVal,auth.login);

router.get('/logout',auth.logout);
router.get('/ver',auth.ver);

module.exports = router;