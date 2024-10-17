const express = require("express");
const router = express.Router();
const admin = require('../controllers/api');
var multer  = require('multer');
const { authenticateToken } = require("../models/function");
var storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, 'uploads')

    },
    filename: function(req, file, cb) {

        cb(null, 'register-'+Date.now() + '-' + file.originalname);

    }
});
var storage2 = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, 'uploads')

    },
    filename: function(req, file, cb) {

        cb(null, 'DOC-'+Date.now() + '-' + file.originalname);

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
var upload2 = multer({
    storage: storage2,

    limits: {
        fileSize: 1024 * 1024 * 100000
    },
    fileFilter: fileFilter

});
//

router.post('/login',admin.login);
router.post('/create/file',authenticateToken,upload.array('file'),admin.create_file);
router.post('/read/file',authenticateToken,admin.read_file);
router.post('/update/file',authenticateToken,admin.update_file);
router.post('/delete/file',authenticateToken,admin.delete_file);

router.post('/create/categorie',authenticateToken,admin.create_categorie);
router.post('/read/categorie',authenticateToken,admin.read_categorie);
router.post('/update/categorie',authenticateToken,admin.update_categorie);
router.post('/delete/categorie',authenticateToken,admin.delete_categorie);

router.post('/read/orga_project',admin.get_projetbyid_orga);
router.post('/search_project',admin.search_project);
router.post('/search_orga',admin.search_orga);
router.post('/search_file_private',admin.search_file_private);
router.post('/search_file_mine',admin.search_file_mine);

//router
router.post('/ask_auth_file',admin.ask_auth_file);
router.post('/add_sign',upload2.single("file"),admin.add_sign);

//user 
router.post('/create/user',admin.add_user);
router.post('/update/user',admin.update_user);
router.post('/delete/user',admin.delete_user);
//role
router.post('/create/role',admin.add_role);
router.post('/update/role',admin.update_role);
router.post('/delete/role',admin.delete_role);


module.exports = {
    router: router,
}