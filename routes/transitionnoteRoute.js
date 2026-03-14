var express = require('express');
var router = express.Router();
const TransitionnoteController = require('../controllers/transitionnoteController');

/* GET home page. */
router.get('/TransitionnoteListall',TransitionnoteController.Transitionnoteall);
router.get('/TransitionnoteById/:id',TransitionnoteController.TransitionnoteById);
router.get('/TransitionnoteById/:journalid/:id',TransitionnoteController.TransitionByUserEdit);
router.get('/TransitionnoteBydocumentId/:id',TransitionnoteController.TreansitionnoteBydocumentId);
router.get('/TransitionnoteRejectById/:journalid/:id',TransitionnoteController.TransitionByUserReject);

router.post('/createTransitionnote',TransitionnoteController.createTransitionnote);
router.put('/updateTransitionnote/:id',TransitionnoteController.updateTransitionnote)

router.delete('/deleteById/:id',TransitionnoteController.deleteById)


module.exports = router;
