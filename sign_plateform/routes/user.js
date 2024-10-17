const express = require("express");
const router = express.Router();
const api = require('../controllers/user');

router.post('/login',api.login)
router.post('/create',api.create_test)
router.post('/read',api.read_test)
router.post('/update',api.update_test)
router.post('/delete',api.delete_test)
router.post('/active',api.active)
router.post('/stat',api.stat)
module.exports = {
    router: router,
}