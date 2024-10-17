const express = require("express");
const router = express.Router();
const admin = require('../controllers/admin');
const { auth_user_admin } = require("../models/function");


//

router.get('/dash',auth_user_admin,admin.dash);
router.get('/',admin.login);
router.get('/sign',admin.signlog);
router.get('/deco',admin.deco);
router.get('/setting',auth_user_admin,admin.setting);
router.get('/active/:id/:code',admin.active)
module.exports = {
    router: router,
}