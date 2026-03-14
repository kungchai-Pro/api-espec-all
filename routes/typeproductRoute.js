var express = require('express');
var router = express.Router();
const TypeProductController = require('../controllers/typeProductController');

/* GET home page. */
router.get('/typeProductListall',TypeProductController.Typeproductall);
router.get('/typeProductgroup',TypeProductController.TypeGrouptypeproduct);
router.get('/typeProductById/:id',TypeProductController.TypeproductById);
router.get('/typeProductByCode/:Id',TypeProductController.TypeproductByCode);

router.post('/createTypeProduct',TypeProductController.Createtypeproduct);
router.put('/updateTypeProduct/:id',TypeProductController.UpdatetypeProduct);
router.delete('/deleteById/:id',TypeProductController.DeleteById);

module.exports = router;
