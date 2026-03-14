var express = require('express');
var router = express.Router();
const groupmenudetailController = require('../controllers/groupmenudetailController');

/* GET home page. */
router.get('/groupmenudetaillistall',groupmenudetailController.GroupmenudetaillistAll);
router.get('/GroupmenudetaillistById/:id',groupmenudetailController.GroupmenudetailById);
router.get('/GroupmenudetaiByprofileId/:id',groupmenudetailController.GroupmenudetailByprofileId);

router.get('/menuListByUserId/:id',groupmenudetailController.getMenuListByUserId);

router.post('/createGroupmenudetaillist',groupmenudetailController.createGroupmenudetailMenu);
router.put('/updateGroupmenudetaillist/:id',groupmenudetailController.updateGroupmenudetail)

router.delete('/deleteById/:id',groupmenudetailController.deleteById)


module.exports = router;
