const express = require("express");
const router = express.Router();
const api = require('../controllers/test');
const { authenticateToken } = require("../models/function_intern/function");
/*var multer  = require('multer')
var storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, 'uploaded')

    },
    filename: function(req, file, cb) {

        cb(null, 'app-'+Date.now() + '-' + file.originalname);

    }
});

var upload = multer({
    storage: storage,

    limits: {
        fileSize: 1024 * 1024 * 100000
    },
    fileFilter: fileFilter

});
// exp logo
router.post('/create_logo',upload.single('logo'),api.create_logo)*/
//TOKEN



/**
 * @swagger
 * tags:
 *   name: Inital Token
 * /api/v1/token/generate_token:
 *   post:
 *     summary: Generate token
 *     description: Generate token
 *     tags: [Token]
 *     responses:
 *       200:
 *         description: Succès de la requête
 *       500:
 *         description: Erreur serveur
 */
router.post('/generate_token',api.generate_token)



module.exports = {
    router: router,
}