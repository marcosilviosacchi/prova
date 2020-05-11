const express = require('express');
const router = express.Router();
const risorsa = require('../controllers/dbAccess');
const mdlVal = require('../middleware/mdlVal');

router.post('/find',risorsa.find);
router.post('/toMany',risorsa.provaToMany); // DA CANCELLARE ALLA FINE
router.put('/update', mdlVal, risorsa.update);
router.post('/insert',mdlVal,risorsa.insert);

module.exports = router;