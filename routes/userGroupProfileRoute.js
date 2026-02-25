var express = require('express');
var router = express.Router();
const UsergroupProfileController = require('../controllers/usergroupProfile');

/* GET home page. */
router.post('/createUserGroupProfile',UsergroupProfileController.creactUserGroupProfile);
router.get('/userGroupProfileById/:id',UsergroupProfileController.UserGroupProfileById);


router.get('/userGroupProfileList',UsergroupProfileController.UserGroupProfileAll);
router.put('/updateUserGroupProfile/:id',UsergroupProfileController.updateById)

router.delete('/deleteUserGroupProfile/:id',UsergroupProfileController.deleteById)

module.exports = router;
