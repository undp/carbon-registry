const express = require("express");
const router = express.Router();
const admin = require('../controllers/surv');


//


router.get('/',admin.index);
router.get('/doc',admin.detail);
module.exports = {
    router: router,
}