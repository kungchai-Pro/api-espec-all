var express = require('express');
var router = express.Router();
const DepartmentController = require('../controllers/departmentsController');

/* GET home page. */
router.get('/departmentListall',DepartmentController.getdepartmentall);
router.get('/departmentById/:id',DepartmentController.departmentById);

router.post('/createdepartment',DepartmentController.createdepartment);
router.put('/updatedepartment/:id',DepartmentController.updatedepartment)

router.delete('/deleteById/:id',DepartmentController.deleteById)


module.exports = router;
