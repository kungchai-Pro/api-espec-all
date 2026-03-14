var express = require('express');
var router = express.Router();
const FlowrunsystemController = require('../controllers/flowrunsystemController');

/* GET home page. */
router.get('/flowrunListall',FlowrunsystemController.Flowrunsystemall);
router.get('/flowrunById/:id',FlowrunsystemController.FlowrunsystemById);
router.post('/flowrunByUserId',FlowrunsystemController.FlowrunsystemByUserId); // เรียกดูสถานะ approvd ปัจจุบัน เช่น previed ,approved , draft 
router.get('/flowrunUserApproved/:id/:numstate',FlowrunsystemController.UserByflowlist); // get status by approved
router.get('/flowrunTotalStatus/:id',FlowrunsystemController.flowTotalBystatusflow); // get status by approved 
router.get('/flowtransationByJournalId/:id',FlowrunsystemController.FlowtransationByJournalID); //get FlowtransationByJournalID
router.get('/flowSteplistByJourId/:id',FlowrunsystemController.FlowSteplistByJourId);

router.post('/createFlowrun',FlowrunsystemController.createFlowrunsystem);
router.put('/updateFlowrun/:id',FlowrunsystemController.updateFlowrunsystem) // update by id 
router.post('/updateFlowrunByState',FlowrunsystemController.UpdateApprovedFlowrunByUserId) // สถานะ save approved อนุมัติ เดียว
router.post('/updateFlowrunGroupByState',FlowrunsystemController.UpdateApprovedGroupFlowrunByUserId) // สถานะ save approved อนุมัติ กลุ่ม
router.post('/updateFlowrunrecieved',FlowrunsystemController.UpdateRecievedflow) // สถานะ save recieved
router.post('/updateFlowrunreject',FlowrunsystemController.UpdateReJectflow) // สถานะ save reject 
router.post('/updateReJectgroupflow',FlowrunsystemController.UpdateReJectgroupflow) // สถานะ save reject  group

router.post('/updateFlowruneditreject',FlowrunsystemController.UpdateEditReject) // สถานะ save reject 

// router.post('/updateFlowrunrecieved',FlowrunsystemController.UpdateRecievedflow) // สถานะ save recieved
router.delete('/deleteById/:id',FlowrunsystemController.deleteById)

module.exports = router;
 