const express = require('express');
const router = express.Router();
var path = require('path');
const passport = require('passport');
const userIndex = require("./user")
const menuIndex = require("./menu")
const ghgIndex = require("./ghg")
const authIndex = require("./auth")
const utilityIndex = require("./utility")
const sharedIndex = require("./shared")
const dataStateIndex = require("./data-state")
const databaseIndex = require("./database");
const ndcIndex = require("./ndc");
const axios = require('axios');
const configIndex = require("./config")
const pluginIndex = require("./plugin");

const { model } = require('mongoose');
const { setTimeout } = require('timers');
/* const shopModule = require("./shop");
router.use('/shop', shopModule.shopRoutes); */
router.use('/user', userIndex.userRoute);
router.use('/menu',passport.authenticate('bearer', { session: false }), menuIndex.menuRoute);
router.use('/ghg', passport.authenticate('bearer', { session: false }), ghgIndex.ghgRoutes);
router.use('/data-state', passport.authenticate('bearer', { session: false }), dataStateIndex.dataStateRoute);
router.use('/database', passport.authenticate('bearer', { session: false }), databaseIndex.databaseRoutes);
router.use('/ndc', passport.authenticate('bearer', { session: false }), ndcIndex.ndcRoutes);
// router.use('/auth', authIndex.authRoute);
/* GET home page. */

router.get('/favicon.ico', (req, res) => res.status(204)) // to skip error for fav icon
router.use('/shared', sharedIndex.sharedRoute ) // to skip error for fav icon
router.use('/plugin',pluginIndex.pluginRoute );

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;