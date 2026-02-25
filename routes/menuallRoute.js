var express = require('express');
var router = express.Router();
const MenuallController = require('../controllers/menuallController');

/* GET home page. */
router.get('/menuallListall',MenuallController.menulistall);
router.get('/menuallById/:id',MenuallController.menulistById);

router.post('/createmenuall',MenuallController.createmenu);
router.put('/updatemenuall/:id',MenuallController.updatenemu)

router.delete('/deleteById/:id',MenuallController.deleteById)

module.exports = router;
