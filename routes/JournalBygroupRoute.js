var express = require('express');
var router = express.Router();
const journalGroupIdController = require('../controllers/JournalBygroupController');

/* GET home page. */
router.get('/NotifygroupByid/:id',journalGroupIdController.NotifygroupByid);
router.get('/journalgroupBycode/:id',journalGroupIdController.journalgroupBycode);
router.get('/journalgroupByid/:id',journalGroupIdController.getJournalGroupByid);

router.get('/journalRejectGroupByid/:id',journalGroupIdController.getJournalRejectGroupByid); // รายการเอกสาร reject

router.get('/journalgrouplistByid/:id',journalGroupIdController.getJournalGroupListByid);
router.get('/journalGrouplistChangeByid/:id',journalGroupIdController.getJournalGroupListChange);

router.post('/newGroupitemId',journalGroupIdController.createGroupItem);
router.put('/UpdateGroupitemById/:id',journalGroupIdController.createGroupItem)


module.exports = router;
