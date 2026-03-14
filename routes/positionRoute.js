var express = require('express');
var router = express.Router();
const PositionController = require('../controllers/positionallController');

/* GET home page. */
router.get('/positionListall',PositionController.positionAll);
router.get('/positionById/:id',PositionController.positionById);

router.post('/createposition',PositionController.creactPosition);
router.put('/updateposition/:id',PositionController.updateById)

router.delete('/deleteById/:id',PositionController.deleteById)


module.exports = router;
