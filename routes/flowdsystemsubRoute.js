var express = require('express');
var router = express.Router();
const FlowsystemsubController= require('../controllers/flowsystemsubController');

/* GET home page. */
router.get('/flowsystemsubListall',FlowsystemsubController.flowsystemsuball);
router.get('/flowsystemsubById/:id',FlowsystemsubController.flowsystemsubById);
router.get('/flowsystemsubByflowId/:id',FlowsystemsubController.flowsystemsubByFlowId);

router.post('/createflowsystemsub',FlowsystemsubController.createflowsystemsub);
router.put('/updateflowsystemsub/:id',FlowsystemsubController.updateflowsystemsub)

router.delete('/deleteById/:id',FlowsystemsubController.deleteById)

module.exports = router;
