var express = require('express');
var router = express.Router();
const NoteGroupController = require('../controllers/noteJournalgroupController');

router.get('/getnotebatch/:id',NoteGroupController.getnotebatch);
router.get('/getnoteItem/:id',NoteGroupController.getnoteItem);

router.post('/creatnotebatch',NoteGroupController.createNotejournalgroupbatch);
router.post('/createnoteitem',NoteGroupController.createNotejournalgroupItemId)

router.put('/updateItemlist/:id',NoteGroupController.updateItemlist)
router.put('/updateNoteBatchById/:id',NoteGroupController.updateNoteBatchById)

// router.delete('/deleteById/:id',MenuallController.deleteById)

module.exports = router;
