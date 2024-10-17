const express = require("express");
const router = express.Router();
const api = require('../controllers/document');
const { authenticateToken } = require("../models/function_intern/function");


var multer  = require('multer')
var storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, 'upload')

    },
    filename: function(req, file, cb) {

        cb(null, 'sign-'+Date.now() + '-' + file.originalname);

    }
});
const fileFilter = (req, file, cb) => {


    cb(null, true);



}
var upload = multer({
    storage: storage,

    limits: {
        fileSize: 1024 * 1024 * 100000
    },
    fileFilter: fileFilter

});
// exp logo

//TOKEN




 
/**
 * @swagger
 * /api/v1/doc/create_project:
 *   post:
 *     summary: Create Role
 *     description: Create Role
 *     tags: [Document]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Role details
 *         schema:
 *           type: object
 *           properties:
 *             IdProjet:
 *               type: string
 *             Type:
 *               type: string
 *             Lang:
 *               type: string
 *           required:
 *             - IdProjet
 *             - Type
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post('/create_project',authenticateToken,api.create_projet_test)
/**
 * @swagger
 * /api/v1/doc/create_idea:
 *   post:
 *     summary: Create Role
 *     description: Create Role
 *     tags: [Document]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Role details
 *         schema:
 *           type: object
 *           properties:
 *             IdIdea:
 *               type: string
 *             Type:
 *               type: string
 *             Lang:
 *               type: string
 *           required:
 *             - IdIdea
 *             - Type
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post('/create_idea',authenticateToken,api.create_idea_test)
/**
 * @swagger
 * /api/v1/doc/read:
 *   post:
 *     summary: Read Role
 *     description: Read Role information
 *     tags: [Document]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         type: string
*       - in: body
 *         name: body
 *         required: true
 *         description: Role details
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             Intitule_role:
 *               type: string
 *           required:
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/read',authenticateToken,api.read_test)
/**
 * @swagger
 * /api/v1/doc/read_global:
 *   post:
 *     summary: Read Role
 *     description: Read Role information
 *     tags: [Document]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         type: string
*       - in: body
 *         name: body
 *         required: true
 *         description: Role details
 *         schema:
 *           type: object
 *           properties:
 *             Id:
 *               type: string
 *             Type:
 *               type: string
 *           required:
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/read_global',authenticateToken,api.read_global)
/**
 * @swagger
 * /api/v1/doc/update:
 *   post:
 *     summary: Mise à jour de la variable test
 *     description: Mise à jour de la valeur de test
 *     tags: [Document]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: Role details
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             Intitule_role:
 *               type: string
 *           required:
 *             - _id
 *             
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/update',authenticateToken,api.update_test)
/**
 * @swagger
 * /api/v1/doc/add_doc_sign:
 *   post:
 *     summary: Mise à jour de la signature
 *     description: Mise à jour de la signature
 *     tags: [Document]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         schema:
 *           type: string
 *       - in: formData
 *         name: Id_pro_idea
 *         type: string
 *         required: true
 *         description: ID of the professional idea
 *       - in: formData
 *         name: Type
 *         type: string
 *         required: true
 *         description: Type of the document
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: The file to upload
 *     responses:
 *       200:
 *         description: Succès de la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/add_doc_sign',upload.single('file'),api.add_doc_sign)
/**
 * @swagger
 * /api/v1/doc/delete:
 *   post:
 *     summary: Supprimer la variable test
 *     description: Supprimer la valeur de test
 *     tags: [Document]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token
 *         schema:
 *           type: string
 *       - in: body
 *         name: _id
 *         description: Id de l'élement 
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *     responses:
 *       200:
 *         description: Succès de la requête
 *       500:
 *         description: Erreur serveur
 */

router.post('/delete',authenticateToken,api.delete_test)

router.post('/sign_auto',authenticateToken,upload.single("signature"),api.sign_auto)
router.post('/ask_auth',authenticateToken,api.ask_auth)

module.exports = {
    router: router,
}