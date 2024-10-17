var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
var Agent_system = require("../controllers/Agent_system/Agent_system");
var Note_idee = require("../controllers/Note_idee/Note_idee");
var Lettre_note_idee = require("../controllers/Lettre_note_idee/Lettre_note_idee");
var Organisation = require("../controllers/Organisation/Organisation");
var Paiement = require("../controllers/Paiement/Paiement");
var Type_paiement = require("../controllers/Type_paiement/Type_paiement");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "carbon_register" + "-" + file.originalname.replace(/\s/g, ""));
  },
});

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(req);
    const uniqueID = uuidv4();
    cb(
      null,
      "carbon_register_" + uniqueID + "-" + file.originalname.replace(/\s/g, "")
    );
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

var upload = multer({
  storage: storage2,

  limits: {
    fileSize: 1024 * 1024 * 100000,
  },
  fileFilter: fileFilter,
});

/* LES DEMANDES POUR LES ENTREPRISES*/
var cpUpload1 = upload.fields([
  { name: "DFE", maxCount: 1 },
  { name: "RCCM", maxCount: 1 },
  { name: "Logo_organisation", maxCount: 1 },
]);

var cpUpload1_paiement = upload.fields([
  { name: "Piece_justificative", maxCount: 10 },
]);

var cpUpload1_note_idee = upload.fields([
  { name: "Document_conformite", maxCount: 1 },
  { name: "Note_idee", maxCount: 1 },
]);

//router.post('/apiv1/creatDemande', cpUpload1,Demande._creatDemande);

//router.post('/apiv1/creatUtilisateur', upload2.single('signature'),Utilisateur._creatUtilisateur);

//router.post("/apiv1/creatUtilisateur",upload2.single("PhotoUtilisateur"),Utilisateur.creatUtilisateur);

//router.post("/apiv1/listUtilisateurbyid", Utilisateur.listUtilisateurbyid);

//router.post("/apiv1/deleteUtilisateur", Utilisateur.deleteUtilisateur);

//router.post("/apiv1/listUtilisateur", Utilisateur.listUtilisateur);

//router.post("/apiv1/editUtilisateur",upload2.single("PhotoUtilisateur"),Utilisateur.editUtilisateur);

//router.post("/apiv1/connexionUtilisateur", Utilisateur.connexionUtilisateur);

/**
 *
 * Agent system
 */

router.post("/apiv1/creatAgent_system", Agent_system.creatAgent_system);
router.post("/apiv1/listAgent_systembyid", Agent_system.listAgent_systembyid);
router.post("/apiv1/deleteAgent_system", Agent_system.deleteAgent_system);
router.post("/apiv1/listAgent_system", Agent_system.listAgent_system);
router.post("/apiv1/editAgent_system", Agent_system.editAgent_system);

/**
 *
 * Note d'idee
 *
 */

router.post(
  "/apiv1/creatNote_idee",
  Agent_system.authenticateToken,
  cpUpload1_note_idee,
  Note_idee.creatNote_idee
);
router.post(
  "/apiv1/listNote_ideebyid",
  Agent_system.authenticateToken,
  Note_idee.listNote_ideebyid
);
router.post(
  "/apiv1/deleteNote_idee",
  Agent_system.authenticateToken,
  Note_idee.deleteNote_idee
);
router.post(
  "/apiv1/listNote_idee",
  Agent_system.authenticateToken,
  Note_idee.listNote_idee
);
router.post(
  "/apiv1/editNote_idee",
  Agent_system.authenticateToken,
  cpUpload1_note_idee,
  Note_idee.editNote_idee
);
router.post(
  "/apiv1/listNoteIdee_by_date_filter",
  Agent_system.authenticateToken,
  Note_idee._listNoteIdee_by_date_filter
);
router.post(
  "/apiv1/rejeter_Note_idee",
  Agent_system.authenticateToken,
  Note_idee._rejeter_Note_idee
);
router.post(
  "/apiv1/valider_Note_idee",
  Agent_system.authenticateToken,
  Note_idee._valider_Note_idee
);
router.post(
  "/apiv1/listNote_idee_by_ref",
  Agent_system.authenticateToken,
  Note_idee._listNote_idee_by_ref
);
router.post(
  "/apiv1/listNote_idee_by_organisation",
  Agent_system.authenticateToken,
  Note_idee._listNote_idee_by_organisation
);

/**
 *
 * Lettre Note d'idee
 *
 */
router.post(
  "/apiv1/recevoir_Lettre_confirmation_note_idee",
  Agent_system.authenticateToken,
  Lettre_note_idee.recevoir_Lettre_confirmation_note_idee
);

router.post(
  "/apiv1/envoyer_Lettre_note_idee_a_organisation",
  Agent_system.authenticateToken,
  Lettre_note_idee.envoyer_Lettre_note_idee_a_organisation
);

router.post(
  "/apiv1/recevoir_Lettre_non_confirmation_note_idee",
  Agent_system.authenticateToken,
  Lettre_note_idee.recevoir_Lettre_non_confirmation_note_idee
);

router.post(
  "/apiv1/envoyer_Lettre_note_idee_au_bureau_marche",
  Agent_system.authenticateToken,
  Lettre_note_idee.envoyer_Lettre_note_idee_au_bureau_marche
);

/**
 *
 * Gestion des organisations
 *
 */

router.post(
  "/apiv1/creatOrganisation",
  Agent_system.authenticateToken,
  cpUpload1,
  Organisation.creatOrganisation
);

router.post(
  "/apiv1/listOrganisationbyid",
  Agent_system.authenticateToken,
  Organisation.listOrganisationbyid
);

router.post(
  "/apiv1/deleteOrganisation",
  Agent_system.authenticateToken,
  Organisation.deleteOrganisation
);

router.post(
  "/apiv1/listOrganisation",
  Agent_system.authenticateToken,
  Organisation.listOrganisation
);

router.post(
  "/apiv1/editOrganisation",
  Agent_system.authenticateToken,
  cpUpload1,
  Organisation.editOrganisation
);

router.post(
  "/apiv1/connexionOrganisation",
  Agent_system.authenticateToken,
  Organisation.connexionOrganisation
);

router.post(
  "/apiv1/listOrganisationbyref",
  Agent_system.authenticateToken,
  Organisation.listOrganisationbyref
);
router.post(
  "/apiv1/send_email_temp_forgot",
  Agent_system.authenticateToken,
  Organisation.send_email_temp_forgot
);
/**
 *
 * Données formatés
 */

router.post(
  "/apiv1/liste_all_note_formated",
  Agent_system.authenticateToken,
  Note_idee.liste_all_note_formated
);

router.post(
  "/apiv1/listNote_idee_by_ref_formate",
  Agent_system.authenticateToken,
  Note_idee.listNote_idee_by_ref_formate
);

/**
 *
 *
 * Paiement
 *
 */

router.post(
  "/apiv1/creatPaiement",
  Agent_system.authenticateToken,
  cpUpload1_paiement,
  Paiement.creatPaiement
);

router.post(
  "/apiv1/listPaiementbyid",
  Agent_system.authenticateToken,
  Paiement.listPaiementbyid
);

router.post(
  "/apiv1/deletePaiement",
  Agent_system.authenticateToken,
  Paiement.deletePaiement
);

router.post(
  "/apiv1/listPaiement",
  Agent_system.authenticateToken,
  Paiement.listPaiement
);

router.post(
  "/apiv1/editPaiement",
  Agent_system.authenticateToken,
  cpUpload1_paiement,
  Paiement.editPaiement
);

router.post(
  "/apiv1/listPaiementby_ref_organisation",
  Agent_system.authenticateToken,
  Paiement._listPaiementby_ref_organisation
);

router.post(
  "/apiv1/listPaiementby_ref_paiement",
  Agent_system.authenticateToken,
  Paiement._listPaiementby_ref_paiement
);

/**
 *
 *
 * Type de Paiement
 *
 */

router.post(
  "/apiv1/creatType_paiement",
  Agent_system.authenticateToken,
  Type_paiement.creatType_paiement
);

router.post(
  "/apiv1/listType_paiementbyid",
  Agent_system.authenticateToken,
  Type_paiement.listType_paiementbyid
);

router.post(
  "/apiv1/deleteType_paiement",
  Agent_system.authenticateToken,
  Type_paiement.deleteType_paiement
);

router.post(
  "/apiv1/listType_paiement",
  Agent_system.authenticateToken,
  Type_paiement.listType_paiement
);

router.post(
  "/apiv1/editType_paiement",
  Agent_system.authenticateToken,
  Type_paiement.editType_paiement
);

router.post(
  "/apiv1/listType_paiementby_ref",
  Agent_system.authenticateToken,
  Type_paiement._listType_paiementby_ref
);

//router.get()

module.exports = router;

/*
                router.post('/apiv1/creatRecours', controller.creatRecours);

                router.post('/apiv1/listRecoursbyid', controller.listRecoursbyid);
    
                router.post('/apiv1/deleteRecours', controller.deleteRecours);
    
                router.post('/apiv1/listRecours', controller.listRecours);
    

                router.post('/apiv1/editRecours', controller.editRecours);

            
                router.post('/apiv1/creatType_recour', controller.creatType_recour);

                router.post('/apiv1/listType_recourbyid', controller.listType_recourbyid);
    
                router.post('/apiv1/deleteType_recour', controller.deleteType_recour);
    
                router.post('/apiv1/listType_recour', controller.listType_recour);
    

                router.post('/apiv1/editType_recour', controller.editType_recour);

            
                router.post('/apiv1/creatLettre_note_idee', controller.creatLettre_note_idee);

                router.post('/apiv1/listLettre_note_ideebyid', controller.listLettre_note_ideebyid);
    
                router.post('/apiv1/deleteLettre_note_idee', controller.deleteLettre_note_idee);
    
                router.post('/apiv1/listLettre_note_idee', controller.listLettre_note_idee);
    

                router.post('/apiv1/editLettre_note_idee', controller.editLettre_note_idee);

            
                router.post('/apiv1/creatLettre_projet', controller.creatLettre_projet);

                router.post('/apiv1/listLettre_projetbyid', controller.listLettre_projetbyid);
    
                router.post('/apiv1/deleteLettre_projet', controller.deleteLettre_projet);
    
                router.post('/apiv1/listLettre_projet', controller.listLettre_projet);
    

                router.post('/apiv1/editLettre_projet', controller.editLettre_projet);

            
                router.post('/apiv1/creatSecteur', controller.creatSecteur);

                router.post('/apiv1/listSecteurbyid', controller.listSecteurbyid);
    
                router.post('/apiv1/deleteSecteur', controller.deleteSecteur);
    
                router.post('/apiv1/listSecteur', controller.listSecteur);
    

                router.post('/apiv1/editSecteur', controller.editSecteur);

            
                router.post('/apiv1/creatSous_secteur', controller.creatSous_secteur);

                router.post('/apiv1/listSous_secteurbyid', controller.listSous_secteurbyid);
    
                router.post('/apiv1/deleteSous_secteur', controller.deleteSous_secteur);
    
                router.post('/apiv1/listSous_secteur', controller.listSous_secteur);
    

                router.post('/apiv1/editSous_secteur', controller.editSous_secteur);

            
                router.post('/apiv1/creatType_lettre', controller.creatType_lettre);

                router.post('/apiv1/listType_lettrebyid', controller.listType_lettrebyid);
    
                router.post('/apiv1/deleteType_lettre', controller.deleteType_lettre);
    
                router.post('/apiv1/listType_lettre', controller.listType_lettre);
    

                router.post('/apiv1/editType_lettre', controller.editType_lettre);

            
                router.post('/apiv1/creatType_notification', controller.creatType_notification);

                router.post('/apiv1/listType_notificationbyid', controller.listType_notificationbyid);
    
                router.post('/apiv1/deleteType_notification', controller.deleteType_notification);
    
                router.post('/apiv1/listType_notification', controller.listType_notification);
    

                router.post('/apiv1/editType_notification', controller.editType_notification);

            
                router.post('/apiv1/creatNotification', controller.creatNotification);

                router.post('/apiv1/listNotificationbyid', controller.listNotificationbyid);
    
                router.post('/apiv1/deleteNotification', controller.deleteNotification);
    
                router.post('/apiv1/listNotification', controller.listNotification);
    

                router.post('/apiv1/editNotification', controller.editNotification);

            
                router.post('/apiv1/creatPaiement', controller.creatPaiement);

                router.post('/apiv1/listPaiementbyid', controller.listPaiementbyid);
    
                router.post('/apiv1/deletePaiement', controller.deletePaiement);
    
                router.post('/apiv1/listPaiement', controller.listPaiement);
    
                router.post('/apiv1/editPaiement', controller.editPaiement);

            
                router.post('/apiv1/creatType_paiement', controller.creatType_paiement);

                router.post('/apiv1/listType_paiementbyid', controller.listType_paiementbyid);
    
                router.post('/apiv1/deleteType_paiement', controller.deleteType_paiement);
    
                router.post('/apiv1/listType_paiement', controller.listType_paiement);
    

                router.post('/apiv1/editType_paiement', controller.editType_paiement);

            
                router.post('/apiv1/creatDocument_projet', controller.creatDocument_projet);

                router.post('/apiv1/listDocument_projetbyid', controller.listDocument_projetbyid);
    
                router.post('/apiv1/deleteDocument_projet', controller.deleteDocument_projet);
    
                router.post('/apiv1/listDocument_projet', controller.listDocument_projet);
    

                router.post('/apiv1/editDocument_projet', controller.editDocument_projet);

            
                router.post('/apiv1/creatRapport_activite', controller.creatRapport_activite);

                router.post('/apiv1/listRapport_activitebyid', controller.listRapport_activitebyid);
    
                router.post('/apiv1/deleteRapport_activite', controller.deleteRapport_activite);
    
                router.post('/apiv1/listRapport_activite', controller.listRapport_activite);
    

                router.post('/apiv1/editRapport_activite', controller.editRapport_activite);

            
                router.post('/apiv1/creatRapport_verification', controller.creatRapport_verification);

                router.post('/apiv1/listRapport_verificationbyid', controller.listRapport_verificationbyid);
    
                router.post('/apiv1/deleteRapport_verification', controller.deleteRapport_verification);
    
                router.post('/apiv1/listRapport_verification', controller.listRapport_verification);
    

                router.post('/apiv1/editRapport_verification', controller.editRapport_verification);

       */
