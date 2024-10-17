const express = require("express");
const router = express.Router();
const admin = require('../controllers/eligi');
const { authenticateliigiToken } = require("../models/function");


//


router.get('/',admin.eligi_start);
router.get('/order',authenticateliigiToken,admin.eligi_order);
router.get('/myideas',authenticateliigiToken,admin.eligi_ideas);
router.get('/note/:id',authenticateliigiToken,admin.eligi_note);
router.get('/param',authenticateliigiToken,admin.eligi_param);
router.get('/pay',authenticateliigiToken,admin.eligi_pay);
router.get('/deco',admin.eligi_deco);
module.exports = {
    router: router,
}