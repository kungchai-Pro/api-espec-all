var express = require('express');
var router = express.Router();
const HostEmailController = require('../controllers/hostemailController');

/* GET home page. */
router.get('/hostemailListall',HostEmailController.HostEmailListAll);
router.get('/hostemailById/:id',HostEmailController.HostEmailToById);

router.post('/createHostemail',HostEmailController.createHostEmail);
router.put('/updateHostemail/:id',HostEmailController.updateHostEmail);

router.delete('/deleteById/:id',HostEmailController.deleteById);


module.exports = router;
