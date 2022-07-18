const express = require('express');
const router = express.Router();
const ghgIndex = require(".");
const { route } = require('../shared/shared-route');
const passport = require('passport');

router.get('/inventoryYear',  function(req, res, next) {
    ghgIndex.ghgController.getInventoryYear(req, res, next);
});
router.get('/fuelType',  function(req, res, next) {
    ghgIndex.ghgController.getFuelType(req, res, next);
});
router.get('/fuelByFuelType/:fuelType',  function(req, res, next) {
    ghgIndex.ghgController.getFuelByFuelType(req, res, next);
});
router.get('/sectorDetails',  function(req, res, next) {
    ghgIndex.ghgController.getSectorDetails(req, res, next);
});
router.post('/sectorDetailsByMenu',  function(req, res, next) {
    ghgIndex.ghgController.sectorDetailsByMenu(req, res, next);
});
router.post('/data',  function(req, res, next) {
    ghgIndex.ghgController.saveGhgData(req, res, next);
});
router.get('/data',  function(req, res, next) {
    ghgIndex.ghgController.getGhgData(req, res, next);
});
/*
* used to get report for mannual ghg
*/
router.get('/report/gas',  function(req, res, next) {
    ghgIndex.ghgController.getReportByGas(req, res, next);
});
router.get('/report/gas/:inventoryYear',  function(req, res, next) {
    ghgIndex.ghgController.getReportByGas(req, res, next);
});
/*
* /report is used to fetch both gas wise and year wise report based on the query parameter sent in report type
* this is newly implemented report based on ghg file upload
* fetches file upload reports
* example: /ghg/report?inventoryYear=1991 - to show data in file upalod page
* example: /ghg/report?reportType=gas&inventoryYear=1990  - gas wise report
* example: /ghg/report?reportType=year&startYear=1990&endYear=1991
*/
router.get('/report',  function(req, res, next) {
    ghgIndex.ghgController.getReport(req, res, next);
});

module.exports = router;