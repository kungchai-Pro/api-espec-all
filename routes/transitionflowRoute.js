var express = require('express');
var router = express.Router();
const TransitionflowController = require('../controllers/transitionflowController');

/* GET home page. */
router.get('/TransitionflowListall',TransitionflowController.Transitionflowall);
router.get('/TransitionflowById/:id',TransitionflowController.TransitionflowById);
router.post('/TransitionByUserId',TransitionflowController.TransitionByUserId);
router.post('/createTransitionflow',TransitionflowController.createTransitionflow);
router.put('/updateTransitionflow/:id',TransitionflowController.updateTransitionflow)

router.delete('/deleteById/:id',TransitionflowController.deleteById)


module.exports = router;
