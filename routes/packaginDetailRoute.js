var express = require('express');
var router = express.Router();
const PackagingDetail = require('../controllers/packagingDetailController');

/* GET home page. */
router.get('/PackagingDetail',PackagingDetail.GetpackangingAll);
// router.get('/departmentById/:id',DepartmentController.departmentById);

router.post('/createPackagingDetail',PackagingDetail.Createpackanging);
router.put('/updatePackagingDetail/:id',PackagingDetail.UpdatepackangingById)

router.delete('/deletePackagingById/:id',PackagingDetail.DeletepackagById)


module.exports = router;