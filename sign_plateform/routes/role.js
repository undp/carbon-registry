const express = require("express");
const router = express.Router();
const api = require('../controllers/role');


router.post('/create',api.create_test)
router.post('/read',api.read_test)
router.post('/update',api.update_test)
router.post('/delete',api.delete_test)

module.exports = {
    router: router,
}