var express = require('express');
var router = express.Router();
const TypestatusController = require('../controllers/typestatusController');

/* GET home page. */
router.get('/typestatusListall',TypestatusController.TypeStatusAll);
router.get('/typestatusById/:id',TypestatusController.TypeStatusById);

router.post('/createtypestatus',TypestatusController.creactTypeStatus);
router.put('/updatetypestatus/:id',TypestatusController.updateById)

router.delete('/deleteById/:id',TypestatusController.deleteById)


module.exports = router;
