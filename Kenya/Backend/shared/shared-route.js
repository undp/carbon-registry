const express = require('express');
const path = require('path');
const router = express.Router();
const sharedIndex =require('.');
const config = require("./../config/config.json");
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.query);
      cb(null, config[process.env.PROFILE].uploadPath)
    },
    filename: function (req, file, cb) {
      console.log("file" , file);
      cb(null, (file.originalname.split(".")[0]) + '-' + Date.now()+path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage })

// ghg  seeds
router.post('/seed/ghgSectorMapping',  function(req, res, next) {
  sharedIndex.sharedController.seedGhgSectorMapping(req, res, next);
});
router.post('/seed/ghgFuelMapping',  function(req, res, next) {
  sharedIndex.sharedController.seedGHGFuelMapping(req, res, next);
});

//appData
router.post('/seed/appdata',  function(req, res, next) {
  sharedIndex.sharedController.seedAppData(req, res, next);
});
router.get('/appdata',  function(req, res, next) {
  sharedIndex.sharedController.getAppData(req, res, next);
});
router.post('/appdata',  function(req, res, next) {
  sharedIndex.sharedController.saveAppData(req, res, next);
});

// seed NDC sector mapping
router.post('/seed/ndc/sectorMapping',  function(req, res, next) {
  sharedIndex.sharedController.seedNDCSectorMapping(req, res, next);
});
router.get('/ndc/sectorMapping',  function(req, res, next) {
  sharedIndex.sharedController.getNDCSectorMapping(req, res, next);
});

// mail
router.post('/mail',  function(req, res, next) {
    sharedIndex.sharedController.addMailTemplate(req, res, next);
});
router.post('/upload',  upload.any(),function(req, res, next) {
    sharedIndex.sharedController.uploadFiles(req, res, next);
});
router.get('/download',  function(req, res, next) {
    sharedIndex.sharedController.download(req, res, next);
});
router.get('/download/template',  function(req, res, next) {
    sharedIndex.sharedController.downloadTemplate(req, res, next);
});
router.get('/fileByMenu',  function(req, res, next) {
    sharedIndex.sharedController.fileByMenu(req, res, next);
});

// common api to get record by given filter
router.get('/record',  function(req, res, next) {
  sharedIndex.sharedController.getRecord(req, res, next);
});
router.get('/report/years',  function(req, res, next) {
  sharedIndex.sharedController.getReportYear(req, res, next);
});
module.exports = router;