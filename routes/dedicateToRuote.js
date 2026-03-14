var express = require('express');
var router = express.Router();
const DedicateToController = require('../controllers/dedicateToController');

/* GET home page. */
router.get('/dedicateToListall',DedicateToController.DedicateToall);
router.get('/dedicateToById/:id',DedicateToController.DedicateToById);

router.post('/createDedicateTo',DedicateToController.createDedicateTo);
router.put('/updateDedicateTo/:id',DedicateToController.updateDedicateTo)

router.delete('/deleteById/:id',DedicateToController.deleteById)


module.exports = router;
