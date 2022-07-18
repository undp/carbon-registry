var express = require('express');
var router = express.Router();
var menuController = require("./menu.controller");


// menu
router.post('/', function(req, res, next) {
    menuController.addMenu(req, res, next);
});
router.put('/', function(req, res, next) {
    menuController.updateMenu(req, res, next);
});
router.get('/', function(req, res, next) {
    menuController.getAllMenu(req, res, next);
});
/* router.get('/hierarchy/:userId', function(req, res, next) {
    menuController.getMenuHierarchy(req, res, next);
}); */
router.get('/parentList/:userId', function(req, res, next) {
    menuController.getParentMenu(req, res, next);
});
router.get('/child/:userId/:menuId', function(req, res, next) {
    menuController.getChildList(req, res, next);
});
router.get('/group', function(req, res, next) {
    menuController.getMenuGroup(req, res, next);
});
router.get('/listByGroup', function(req, res, next) {
    menuController.getMenuListByGroup(req, res, next);
});
router.get('/remaining', function(req, res, next) {
    menuController.getRemainingMenuList(req, res, next);
});
router.get('/seed', function(req, res, next) {
    menuController.processSeedMenu(req, res, next);
});
/* 
router.get('/parent', function(req, res, next) {
    menuController.getParentMenuList(req, res, next);
});
router.get('/child', function(req, res, next) {
    menuController.getChildMenuList(req, res, next);
});
router.get('/bygroup', function(req, res, next) {
    menuController.getMenuByGroup(req, res, next);
}); */
module.exports = router;
