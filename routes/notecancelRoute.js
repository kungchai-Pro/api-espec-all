var express = require('express');
var router = express.Router();
const NotecancelController = require('../controllers/notecancelController');

/* GET home page. */
router.post('/createNoteCancel',NotecancelController.CreateNoteCancel);
router.get('/getNoteCancelByDocumentId/:id',NotecancelController.getNoteCancelByDocumentId);

// router.post('/createmenuall',MenuallController.createmenu);
// router.put('/updatemenuall/:id',MenuallController.updatenemu)

// router.delete('/deleteById/:id',MenuallController.deleteById)

module.exports = router;
