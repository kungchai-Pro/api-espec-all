var express = require('express');
var router = express.Router();
const TypeDocumentController = require('../controllers/typeDocumentController');

/* GET home page. */
router.get('/typeDocumentListall',TypeDocumentController.TypeDocumentAll);
router.get('/typeDocumentById/:id',TypeDocumentController.TypeDocumentById);

router.post('/createtypeDocument',TypeDocumentController.creactTypeDocument);
router.put('/updatetypeDocument/:id',TypeDocumentController.updateById)

router.delete('/deleteById/:id',TypeDocumentController.deleteById)


module.exports = router;
