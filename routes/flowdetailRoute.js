var express = require('express');
var router = express.Router();
const FlowdetailController= require('../controllers/flowdetailController');

/* GET home page. */
router.get('/flowdetailListall',FlowdetailController.flowdetailall);
router.get('/flowdetailById/:id',FlowdetailController.flowdetailById);
router.get('/flowdetailBysubId/:id',FlowdetailController.flowdetailBysubId);
router.get('/ListflowBysubId/:id',FlowdetailController.ListflowBysubId);

router.post('/createflowdetail',FlowdetailController.createflowdetail);
router.put('/updateflowdetail/:id',FlowdetailController.updateflowdetail);
router.put('/updateflowdetailById/:id',FlowdetailController.updateflowdetailById);

router.delete('/deleteById/:id',FlowdetailController.deleteById)


module.exports = router;
