const express = require("express");
const router = express.Router();
const admin = require('../controllers/ministry');
const { auth_user_admin } = require("../models/function");


//


router.get('/',auth_user_admin,admin.index);
router.get('/file/:id',auth_user_admin,admin.detail);
router.get("/biblio",auth_user_admin,admin.biblio)
module.exports = {
    router: router,
}