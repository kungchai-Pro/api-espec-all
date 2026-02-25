var express = require('express');
var router = express.Router();
const UserController = require('../controllers/usersController');

/* GET home page. */
router.get('/userListall',UserController.userProfileAll);
router.get('/userById/:Id',UserController.userById);
router.get('/userListBydepartment/:id',UserController.UserListByDepartment);
router.get('/userloinbyuser/:id',UserController.loginByUserlist);

router.post('/login',UserController.loginUser);
router.post('/createuser',UserController.createUser);

router.put('/updateuser/:id',UserController.userUpdateById)
router.put('/changepassword/:id',UserController.changePassword)
router.put('/userUpdateBymenugroupId/:id',UserController.userUpdateBymenugroupId)

router.delete('/deleteUserById/:Id',UserController.deleteUserById)


module.exports = router;
