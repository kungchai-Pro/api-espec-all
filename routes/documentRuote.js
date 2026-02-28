var express = require('express');
var router = express.Router();
const DocumentController = require('../controllers/documentController');

/* GET home page. */
router.get('/DocumentListall',DocumentController.DocumentAll);
router.get('/DocumentById/:id',DocumentController.DocumentById);
router.get('/DocumentByCode/:id',DocumentController.DocumentByCode);
router.get('/DocumentByStateAll/:id',DocumentController.DocumentflowByStateAll);// รายการทั้งหมด ตาม user
router.get('/DocumentListByGroupId/:id',DocumentController.DocumentListByGroupId);// รายการทั้งหมด ตาม user

router.get('/DocumentDraftlist/:id',DocumentController.getDocumentflowDraft);// รายการรอ recieved ตาม user
router.get('/DocumentPreRecieved/:id',DocumentController.getDocumentflowPanding);// รายการรอ recieved ตาม user
router.get('/DocumentInpreview/:id',DocumentController.getDocumentflowInPreView);// รายการรอ inpreveiw ตาม user
router.get('/DocumentApprovedlist/:id',DocumentController.getDocumentflowApproved);// รายการรอ approved ตาม user
router.get('/DocumentSuccessfullylist/:id',DocumentController.getDocumentflowSuccessfully);// รายการรอ approved ตาม user
router.get('/JournalSuccessfullylist',DocumentController.getJournalSuccessfully);// รายการรอ approved ตาม user
router.get('/notifylistByIdUser/:Id',DocumentController.getnotifylistByIdUser);// total sum status

router.get('/DocumentRejectlist/:id',DocumentController.getDocumentflowReject);// รายการรอ approved ตาม user
router.get('/DocumentRejectlistsuccessful/:id',DocumentController.getDocumentflowRejectEidtsuccessful);// รายการรอ approved ตาม user
router.get('/warningNotityByUserId/:id',DocumentController.getWarningOntifyByuserId);// รายการรอ approved ตาม user

router.get('/DocumentAllByUserId/:id',DocumentController.DocumentflowAllByUserId);// รายการรอ all liset by user Id ตาม user
router.get('/DocumentDraftByUserId/:id',DocumentController.DocumentflowdraftByUserId);// รายการรอ draft ตาม user
router.get('/CehckNewRunning/:id',DocumentController.CheckNewRunning);// รายการรอ approved ตาม user
router.get('/DocumentDetailByCode/:id',DocumentController.DocumentDetailByCodeJour);// แสดงรายการ ตาม code journal ส่วน detail
router.get('/DocumentDetailListByCode/:id',DocumentController.DocumentDetailListByCode);// แสดงรายการ ตาม code journal ส่วน detail

router.get('/DocumentDetailById/:id',DocumentController.DocumentDetailById);// แสดงรายการ ตาม code journal ส่วน detail
 
router.get('/DocumentSpecificByCode/:id',DocumentController.getSSpecificationBycode); // แสดงรายการ ตาม code journal images
router.get('/DocumentSpecificById/:id',DocumentController.getSSpecificationById); // แสดงขอมูลตาม Id
router.get('/DocumentSpecificBydetailId/:id',DocumentController.getSSpecificationBydetailId); // แสดงขอมูลตาม Id

router.post('/ReviseJournallist',DocumentController.getReviseJournallist); 
router.post('/updateDocumentChengeFlow',DocumentController.updateDocumentChengeFlow); //แบบลบข้อมูลเดิม Check item ซ่ำกันในกรณีเพิ่ม ส่วนของ item detial
router.post('/updateDocumentChengeFlowNotDelete',DocumentController.updateDocumentChengeFlowNotDelete);  // แบบไม่ลบข้อมูลเดิม ลบแค่ workflow


router.post('/createDocument',DocumentController.createDocument);
router.post('/createDocumentdetail',DocumentController.CreateDocumentDail);

router.post('/createDocumentSpecification',DocumentController.Create_SDSS_Specification);
router.post('/createReviseDocument',DocumentController.createReviseDocument); // revise แบบ เดียว
router.post('/createReviseGroupDocument',DocumentController.createReviseGroupDocument); // revise แบบ กลุ่ม

router.post('/searchJournalByfieldBatch',DocumentController.SearchJourByfieldBatch); // ค้นหาข้อมูลแบบ like หน้า search journal batch
router.post('/searchJournalByfieldItemId',DocumentController.SearchJourByfieldItemId); // ค้นหาข้อมูลแบบ like หน้า search journal itemId

router.put('/updateDocument/:id',DocumentController.updateDocument);
router.put('/updateFlowState/:id',DocumentController.updateFlowState)
router.put('/updateDacumentStatusCancel/:id',DocumentController.updateDacumentStatusCancel) // update active = 0 เมื่อยกเลิกเอกสาร กรณีที่ยังไม่ส่งเอกสาร

router.put('/updateDetail/:id',DocumentController.updateDetailById)
router.put('/updateDetailByItem/:id',DocumentController.UpdateDetailByItem) //update detail by item id
router.put('/updateDetailBatch/:id',DocumentController.UpdateDetailBatch) //update detail by Batch 

router.put('/updateSpecification/:id',DocumentController.Update_Specification)
router.put('/updateSpecall/:id',DocumentController.updateSpecall);


router.delete('/deleteById/:id',DocumentController.deleteById);
router.delete('/detaildeleteById/:id',DocumentController.DetailDeleteById);
router.delete('/specificdeleteById/:id',DocumentController.DeleteSpecificationByid);





module.exports = router;
