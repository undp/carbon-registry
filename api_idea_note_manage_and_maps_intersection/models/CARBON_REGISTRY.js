const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/CARBON_REGISTRY";

const options = {
  user: "api_carbon",
  pass: "10043111Mm@",
  authSource: "admin", // Change this to the database you use for authentication if different
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: false,
};

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

mongoose
  .connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
var Agent_system = mongoose.Schema({
  Libelle: String,
  Token: String,
  Expiration_token: String,
  Identifiant: String,
  Date_system: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
  Statut: String,
  Date_creation: String,
});

var Note_idee = mongoose.Schema({
  Ref_note_idee: String,
  Intitule_projet: String,
  Document_conformite: Array,
  Note_idee: Array,
  Commentaire_recours: String,
  Idpayement: String,
  Statut: String,
  Date_system: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
  Id_organisation: String,
  Date_creation: Date,
  Date_update: Date,
});

var Organisation = mongoose.Schema({
  Ref_organisation: String,
  Denomination_organisation: String,
  Logo_organisation: String,
  Site_web_organisation: String,
  Email_organisation: String,
  Numero_tel_organisation: String,
  Email_admin_organisation: String,
  Numero_tel_admin_organisation: String,
  Mot_de_passe_temporaire_admin: String,
  Fichier: Array,
  Statut_organisation: String,
  Id_registre_organisation: String,
  Date_system: {
    type: Date,
    default: Date.now, // This sets the default value to the current date and time
  },
  Date_creation: Date,
  Date_update: Date,
});

var Paiement = mongoose.Schema({
  Ref_paiement: String,
  numero_transaction: String,
  Id_type_paiement: String,
  Methode_paiement: String,
  Id_Organisation: String,
  Piece_justificative: Array,
  Statut: String,
  Date_system: String,
});

var Type_paiement = mongoose.Schema({
  Ref_type_paiement: String,
  Libelle_type_paiement: String,
  Ref_paiement: String,
  Montant_type_paiement: String,
  Statut: String,
  Date_system: String,
});

var Recours = mongoose.Schema({
  ref_recours: String,
  Motif_recour_desc: String,
  Fichier_joint: String,
  Statut: String,
  Id_type_recour: String,
  Id_entite: String,
});

var Type_recour = mongoose.Schema({
  ref_type_recour: String,
  url_model_recour: String,
  libelle_type_recour: String,
  Statut: String,
  Code_recour: String,
  Date_system: String,
});

var Lettre_note_idee = mongoose.Schema({
  ref_lettre: String,
  Id_type_lettre: String,
  url_lettre: String,
  Statut: String,
  Id_note_idee: String,
  Date_system: String,
});

var Lettre_projet = mongoose.Schema({
  ref_lettre: String,
  Id_type_lettre: String,
  url_lettre: String,
  Statut: String,
  Id_projet: String,
  Date_system: String,
});

var Secteur = mongoose.Schema({
  ref_secteur: String,
  libelle_sous_secteur: String,
  url_lettre: String,
  Date_system: String,
});

var Sous_secteur = mongoose.Schema({
  Ref_sous_secteur: String,
  Libelle_sous_secteur: String,
  Idsecteur: String,
  Date_system: String,
});

var Type_lettre = mongoose.Schema({
  Ref_type_lettre: String,
  Libelle_type_lettre: String,
  Statut: String,
  Date_system: String,
});

var Type_notification = mongoose.Schema({
  Ref_type_notification: String,
  Code_notification: String,
  Libelle_notification: String,
  Contenu_notification: String,
  Statut: String,
  Date_system: String,
});

var Notification = mongoose.Schema({
  Ref_notification: String,
  Titre_notification: String,
  Id_type_notification: String,
  Id_Organisation: String,
  Statut: String,
  Date_system: String,
});

var Document_projet = mongoose.Schema({
  Ref_document_projet: String,
  Fichier_madd: String,
  Fichier_rapport_validation: String,
  Id_projet: String,
  Id_certificateur_localal: String,
  Matricule_certificateur_international: String,
  Nom_certificateur_international: String,
  Statut: String,
  Date_system: String,
});

var Agent_system = mongoose.model("Agent_system", Agent_system);
var Note_idee = mongoose.model("Note_idee", Note_idee);
var Organisation = mongoose.model("Organisation", Organisation);
var Paiement = mongoose.model("Paiement", Paiement);
var Type_paiement = mongoose.model("Type_paiement", Type_paiement);

module.exports = {
  Agent_system: Agent_system,
  Note_idee: Note_idee,
  Organisation: Organisation,
  Type_paiement: Type_paiement,
  Paiement: Paiement,
};

var Rapport_verification = mongoose.Schema({
  Ref_rapport_verification: String,
  Fichier_rapport_verification: String,
  Id_activte: String,
  Id_certificateur_localal: String,
  Matricule_certificateur_international: String,
  Nom_certificateur_international: String,
  Statut: String,
  Date_system: String,
});
