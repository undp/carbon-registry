var express = require('express');
var router = express.Router();
var userController = require("./user-controller");
const passport = require('passport');

// role
/* router.post('/admin/role', function(req, res, next) {
    userController.addRole(req, res, next);
});
router.put('/admin/role', function(req, res, next) {
    userController.updateRole(req, res, next);
});
router.get('/admin/role', function(req, res, next) {
    userController.getRole(req, res, next);
}); */
// user
router.post('/', function(req, res, next) {
    userController.addUser(req, res, next);
});
router.put('/',passport.authenticate('bearer', { session: false }), function(req, res, next) {
    userController.updateUser(req, res, next);
});
router.get('/',passport.authenticate('bearer', { session: false }),  function(req, res, next) {
    userController.getUser(req, res, next);
});
router.get('/:status', passport.authenticate('bearer', { session: false }),function(req, res, next) {
    userController.getUserByStatus(req, res, next);
});
router.put('/updateStatus', passport.authenticate('bearer', { session: false }),function(req, res, next) {
    userController.updateUserStatus(req, res, next);
});
router.post('/login', passport.authenticate('local'),function(req, res, next) {
    userController.login(req, res, next);
});
router.post('/forgot-password/otp',function(req, res, next) {
    userController.sendForgotPasswordOtp(req, res, next);
});
/* router.post('/forgot-password/otp/verify',function(req, res, next) {
    userController.sendForgotPasswordOtpVerify(req, res, next);
}); */
router.post('/reset/password',function(req, res, next) {
    userController.resetPassword(req, res, next);
});
router.put('/password',function(req, res, next) {
    userController.updatePassword(req, res, next);
});
module.exports = router;