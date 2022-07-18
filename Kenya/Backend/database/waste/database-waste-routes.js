const express = require('express');
const router = express.Router();
const databaseWasteIndex = require(".");

router.post('/population', function(req, res, next) {
    databaseWasteIndex.databaseWasteController.savePopulation(req, res, next);
});
router.get('/population', function(req, res, next) {
    databaseWasteIndex.databaseWasteController.getPopulation(req, res, next);
});


module.exports = router;