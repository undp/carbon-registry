const express = require("express");
const router = express.Router();
const admin = require('../controllers/global');


//

router.get('/',admin.index);
router.get('/ai',admin.aibot)
router.get('/apropos',admin.apropos);
router.get('/dash',admin.dash);
router.get('/landing',admin.landing)
router.get('/explorer',admin.explorer)
router.get('/eligibilite',admin.eligibilite);
router.get('/verify',admin.verify);

router.get('/faq',admin.faq);
router.get('/contact',admin.contact);
router.get('/projet',admin.projet);
router.get('/projet/:id',admin.projet_detail);
router.get('/secteur',admin.secteur);
router.get('/credit',admin.credit);
router.get('/doc',admin.document);
router.get('/org',admin.organisation)
router.get('/org/:id',admin.detail_orga)

module.exports = {
    router: router,
}