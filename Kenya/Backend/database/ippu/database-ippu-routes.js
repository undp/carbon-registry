const express = require('express');
const router = express.Router();
const databaseIppuIndex = require(".");

router.post('/emissionFactor', function(req, res, next) {
    databaseIppuIndex.databaseIppuController.saveEmissionFactor(req, res, next);
});
router.get('/emissionFactor', function(req, res, next) {
    databaseIppuIndex.databaseIppuController.getEmissionFactor(req, res, next);
});
//gwp
router.post('/seed/gwp', function(req, res, next) {
    databaseIppuIndex.databaseIppuController.seedGWP(req, res, next);
});
router.post('/gwp', function(req, res, next) {
    databaseIppuIndex.databaseIppuController.saveGWP(req, res, next);
});
router.get('/gwp', function(req, res, next) {
    databaseIppuIndex.databaseIppuController.getGWP(req, res, next);
});


module.exports = router;