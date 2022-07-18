const express = require('express');
const router = express.Router();
const databaseIndex = require(".");
const { route } = require('../shared/shared-route');

router.use("/energy",databaseIndex.databaseEnergyIndex.databaseEnergyRoutes);
router.use("/ippu",databaseIndex.databaseIppuIndex.databaseIppuRoutes);
router.use("/afolu",databaseIndex.databaseAfoluIndex.databaseAfoluRoutes);
router.use("/waste",databaseIndex.databaseWasteIndex.databaseWasteRoutes);
module.exports = router;
