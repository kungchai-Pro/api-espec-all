var express = require('express');
var router = express.Router();
const NoteJournalgroup = require('../controllers/noterejectgroupController');

/* GET home page. */
router.post('/NoteRejectgroup',NoteJournalgroup.createNoteReject);
router.get('/getnoteRejectgroupById/:id',NoteJournalgroup.getnoteRejectgroupById);
router.get('/getnoteRejectIdgroup/:id',NoteJournalgroup.getnoteRejectgroupBygroudCode);

// router.put('/updatePackagingDetail/:id',NoteJournalgroup.UpdatepackangingById)

// router.delete('/deletePackagingById/:id',NoteJournalgroup.DeletepackagById)


module.exports = router;