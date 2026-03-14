var express = require('express');
var router = express.Router();
const FlowSystemController= require('../controllers/flowsystemController');

/* GET home page. */
router.get('/flowsystemListall',FlowSystemController.flowsystemall);
router.get('/flowsystemById/:Id',FlowSystemController.flowsystemById);
router.get('/flowgroupbyName',FlowSystemController.getflowgroupbyName);
router.get('/flowbyNamelist/:Id',FlowSystemController.getflowbyNamelist);


router.post('/createflowsystem',FlowSystemController.createflowsystem);
router.put('/updateflowsystem/:id',FlowSystemController.updateflowsystem)

router.delete('/deleteById/:id',FlowSystemController.deleteById)


module.exports = router;
