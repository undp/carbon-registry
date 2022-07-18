const express = require('express');
const router = express.Router();
const databaseEnergyIndex = require(".");

router.post('/emissionFactor', function(req, res, next) {
    databaseEnergyIndex.databaseEnergyController.saveEmissionFactor(req, res, next);
});
router.post('/seed/emissionFactor', function(req, res, next) {
    databaseEnergyIndex.databaseEnergyController.seedEmissionFactor(req, res, next);
});
router.get('/emissionFactor', function(req, res, next) {
    databaseEnergyIndex.databaseEnergyController.getEmissionFactor(req, res, next);
});
// fugitive
router.post('/fugitive', function(req, res, next) {
    databaseEnergyIndex.databaseEnergyController.saveFugitiveEmission(req, res, next);
});
router.post('/seed/fugitive', function(req, res, next) {
    databaseEnergyIndex.databaseEnergyController.seedFugitiveEmission(req, res, next);
});
router.get('/fugitive', function(req, res, next) {
    databaseEnergyIndex.databaseEnergyController.getFugitiveEmission(req, res, next);
});


module.exports = router;