var express = require('express');
var router = express.Router();

const JourtnalImagesController = require('../controllers/journalImagesController');

router.get('/JouranlImagesById/:id',JourtnalImagesController.getJournalImagesById);
router.get('/JouranlImagesByCode/:id',JourtnalImagesController.getJournalImagesBycode);

router.post('/createJournalImages',JourtnalImagesController.CreateJournalImagesn);
router.put('/updateJournalImages/:id',JourtnalImagesController.UpdateJournalImages);
router.delete('/JournalImagsById/:id',JourtnalImagesController.DeleteJournalImagesByid);

module.exports = router;