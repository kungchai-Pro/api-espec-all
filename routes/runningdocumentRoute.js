var express = require('express');
var router = express.Router();
const RunningdocumentController = require('../controllers/runningdocumentController');

/* GET home page. */
router.get('/runningListall',RunningdocumentController.Runningdocumentall);
router.get('/runningById/:id',RunningdocumentController.RunningdocumentById);
router.get('/runningByYear/:id',RunningdocumentController.RunningByYear);


router.post('/createRunning',RunningdocumentController.createRunningdocument);
router.put('/updateRunning/:id',RunningdocumentController.updateRunningdocument);

router.put('/updateNewRunning/:id',RunningdocumentController.updateNewRunning) // update new running 


router.delete('/deleteById/:id',RunningdocumentController.deleteById)


module.exports = router;
