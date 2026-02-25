var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/uploadefile.controller');

// จัดการ ไฟล์เพื่อทำการ  upload 
router.post('/images/uploadfile',Controllers.uploadFile);
router.post('/images/webcamuploadfile',Controllers.WebcamUploadfileImage);
router.get('/images/getfilelist',Controllers.getFilesList);
router.get('/images/files/:name',Controllers.downloadFiles);

module.exports = router;