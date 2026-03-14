var express = require('express');
var router = express.Router();
const FlowdetailsubController= require('../controllers/flowdetailsubController');

/* GET home page. */
router.get('/flowdetailsubListall',FlowdetailsubController.flowdetailsuball);
router.get('/flowdetailsubById/:id',FlowdetailsubController.flowdetailsubById);
router.get('/flowdetailBydetailsubId/:id',FlowdetailsubController.flowdetailsubByDetailId);

router.post('/createflowdetailsub',FlowdetailsubController.createflowdetailsub);
router.put('/updateflowdetailsub/:id',FlowdetailsubController.updateflowdetailsub)

router.delete('/deleteById/:id',FlowdetailsubController.deleteById)


module.exports = router;
