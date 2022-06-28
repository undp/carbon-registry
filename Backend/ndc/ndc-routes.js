const express = require('express');
const router = express.Router();
const ndcIndex = require(".");

router.post('/', function(req, res, next) {
    ndcIndex.ndcController.saveNDC(req, res, next);
});
router.get('/', function(req, res, next) {
    ndcIndex.ndcController.getNDC(req, res, next);
});
router.get('/projectByModule', function(req, res, next) {
    ndcIndex.ndcController.getNDCProject(req, res, next);
});
router.delete('/:id', function(req, res, next) {
    ndcIndex.ndcController.deleteNDC(req, res, next);
});
router.get('/report', function(req, res, next) {
    ndcIndex.ndcController.getNDCReport(req, res, next);
});

module.exports = router;