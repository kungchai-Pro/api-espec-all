var express = require('express');
var router = express.Router();
const RunningGroupIdController = require('../controllers/runningGroupItemController');

/* GET home page. */
router.get('/runningListall',RunningGroupIdController.RunningGroupIdall);
router.get('/runningById/:id',RunningGroupIdController.RunningGroupIdById);
router.get('/runningByYear',RunningGroupIdController.RunningByYear);


router.post('/createRunning',RunningGroupIdController.createRunningGroupItem);
router.put('/updateRunning/:id',RunningGroupIdController.updateRunningGroupItem);

router.put('/updateNewRunning',RunningGroupIdController.updateNewRunning) // update new running 


router.delete('/deleteById/:id',RunningGroupIdController.deleteById)


module.exports = router;
