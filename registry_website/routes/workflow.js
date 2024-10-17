const express = require("express");
const router = express.Router();
const admin = require('../controllers/workflow');


//

router.get('/',admin.list);
router.get('/detail',admin.detail);
router.get('/send',admin.send);
module.exports = {
    router: router,
}