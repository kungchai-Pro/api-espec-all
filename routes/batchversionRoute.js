var express = require('express');
var router = express.Router();
const BatchController = require('../controllers/batchversionController');

/* GET home page. */
router.get('/batchversionListall',BatchController.BatchversionAll);
router.get('/batchversionById/:id',BatchController.BatchversionById);
router.get('/batchversionByNumber/:id',BatchController.BatchversionByืNumbers);

router.post('/createBatchversion',BatchController.createBatchversion);
router.put('/updateBatchversion/:id',BatchController.updateBatchversion)

router.delete('/deleteById/:id',BatchController.deleteById)


module.exports = router;
