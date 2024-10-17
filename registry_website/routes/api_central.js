const express = require("express");
const router = express.Router();
const admin = require('../controllers/api_central');
var multer  = require('multer');
const { authenticateToken } = require("../models/function");
var storage = multer.diskStorage({

    destination: function(req, file, cb) {

        cb(null, 'tempfiles')

    },
    filename: function(req, file, cb) {

        cb(null, 'temp-'+Date.now() + '-' + file.originalname);

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
//

						
const cpUpload = upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'fiscal', maxCount: 1 },
    { name: 'registre', maxCount: 1 },
    { name: 'note', maxCount: 1 },
    { name: 'conformite', maxCount: 1 },
    { name: 'justif', maxCount: 1 },
  
]);
router.post('/login',admin.login);
router.post('/register',cpUpload,admin.register);
router.post('/verify',admin.verify);
router.post('/add_note',cpUpload,admin.add_note);
router.post('/update_note',cpUpload,admin.update_note);
router.post('/update_note_recours',admin.update_note_recours);
router.post('/update_orga',cpUpload,admin.update_orga);
router.post('/update_orga_pass',cpUpload,admin.update_orga_pass);

router.post('/send_message',admin.send_message);
module.exports = {
    router: router,
}