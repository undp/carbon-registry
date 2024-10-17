const Rapport_activite = require("../models/CARBON_REGISTRY").Rapport_activite;

var _creatRapport_activite = (req, res) => {
  Rapport_activite = new Rapport_activite();

  Rapport_activite.Ref_rapport_activite = req.body.Ref_rapport_activite;
  Rapport_activite.Fichier_rapport_suivi = req.body.Fichier_rapport_suivi;
  Rapport_activite.Fichier_rapport_verification =
    req.body.Fichier_rapport_verification;
  Rapport_activite.Id_activte = req.body.Id_activte;
  Rapport_activite.Id_certificateur_localal = req.body.Id_certificateur_localal;
  Rapport_activite.Matricule_certificateur_international =
    req.body.Matricule_certificateur_international;
  Rapport_activite.Nom_certificateur_international =
    req.body.Nom_certificateur_international;
  Rapport_activite.Statut = req.body.Statut;
  Rapport_activite.Date_system = req.body.Date_system;

  Rapport_activite.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};



var _Validation_Rapport_activite = (req, res) => {
    Rapport_activite.findByid(
      req.body.Rapport_activiteid.trim(),
      (err, Rapport_activite) => {
        Rapport_activite.Statut = "valide";
        Rapport_activite.save(function (err) {
          if (err) {
            res.send(err);
          }
  
          res.send("1");
        });
      }
    );
  };


  
var _Non_Validation_Rapport_activite = (req, res) => {
    Rapport_activite.findByid(
      req.body.Rapport_activiteid.trim(),
      (err, Rapport_activite) => {
        Rapport_activite.Statut = "non_valide";
        Rapport_activite.save(function (err) {
          if (err) {
            res.send(err);
          }
  
          res.send("1");
        });
      }
    );
  };


var _listRapport_activitebyid = (req, res) => {
  Rapport_activite.findByid(
    req.body.Rapport_activiteid.trim(),
    (err, Rapport_activite) => {
      if (err) {
        res.send(err);
      }
      res.send(Rapport_activite);
    }
  );
};
var _listRapport_activite = (req, res) => {
  Rapport_activite.find((err, Rapport_activite) => {
    res.send(Rapport_activite);
  });
};

var _deleteRapport_activite = (req, res) => {
  Rapport_activite.deleteOne(
    { _id: req.body.Rapport_activiteid.trim() },
    function (err) {
      if (err) {
        req.send(err);
      }
      res.send("1");
    }
  );
};

var _editRapport_activite = (req, res) => {
  Rapport_activite.findByid(
    req.body.Rapport_activiteid.trim(),
    (err, Rapport_activite) => {
      Rapport_activite.Ref_rapport_activite = req.body.Ref_rapport_activite;
      Rapport_activite.Fichier_rapport_suivi = req.body.Fichier_rapport_suivi;
      Rapport_activite.Fichier_rapport_verification =
        req.body.Fichier_rapport_verification;
      Rapport_activite.Id_activte = req.body.Id_activte;
      Rapport_activite.Id_certificateur_localal =
        req.body.Id_certificateur_localal;
      Rapport_activite.Matricule_certificateur_international =
        req.body.Matricule_certificateur_international;
      Rapport_activite.Nom_certificateur_international =
        req.body.Nom_certificateur_international;
      Rapport_activite.Statut = req.body.Statut;
      Rapport_activite.Date_system = req.body.Date_system;

      Rapport_activite.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
};

module.exports = {
  creatRapport_activite: creatRapport_activite,
  listRapport_activitebyid: listRapport_activitebyid,
  deleteRapport_activite: deleteRapport_activite,
  listRapport_activite: listRapport_activite,
  editRapport_activite: editRapport_activite,
  Non_Validation_Rapport_activite:_Non_Validation_Rapport_activite,
  Validation_Rapport_activite:_Validation_Rapport_activite

};
