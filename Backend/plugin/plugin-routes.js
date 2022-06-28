var express = require('express');
var router = express.Router();
var pluginController = require("./plugin-controller");

router.get('/client',  function(req, res, next) {
    pluginController.getClient(req, res, next);
});
router.post('/validateClient',  function(req, res, next) {
    pluginController.validateClient(req, res, next);
});
router.post('/client',function(req, res, next) {
    pluginController.saveClient(req, res, next);
});
router.put('/client/:clientId',function(req, res, next) {
    pluginController.updateClient(req, res, next);
});

module.exports = router;