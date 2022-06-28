var express = require('express');
var router = express.Router();
const dataStateIndex = require(".")

router.put('/status', function(req, res, next) {
    dataStateIndex.dataStateController.updateDataStateStatus(req,res,next);
});
router.get('/ndc', function(req, res, next) {
    dataStateIndex.dataStateController.getNDCByStatusAndEntity(req, res, next);
});
router.get('/:status', function(req, res, next) {
    dataStateIndex.dataStateController.getDataStateByStatus(req, res, next);
});
module.exports = router;
