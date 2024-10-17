var express = require("express");
var router = express.Router();

var maps_projet = require("../controllers/maps/maps");

router.get("/", maps_projet.maps_projet);
router.post("/projets", maps_projet.list_projets);
router.post("/search_projets", maps_projet.search_projets);
router.post("/getprojetIntersection", maps_projet.getprojetIntersection);
module.exports = router;
