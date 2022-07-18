const express = require('express');
const router = express.Router();
const databaseAfoluIndex = require(".");

router.post('/seed/emissionFactor/', function(req, res, next) {
    databaseAfoluIndex.databaseAfoluController.seedEmissionFactor(req, res, next);
});
router.post('/emissionFactor', function(req, res, next) {
    databaseAfoluIndex.databaseAfoluController.saveEmissionFactor(req, res, next);
});
router.get('/emissionFactor', function(req, res, next) {
    databaseAfoluIndex.databaseAfoluController.getEmissionFactor(req, res, next);
});
router.post('/population', function(req, res, next) {
    databaseAfoluIndex.databaseAfoluController.savePopulation(req, res, next);
});
router.get('/population', function(req, res, next) {
    databaseAfoluIndex.databaseAfoluController.getPopulation(req, res, next);
});


module.exports = router;