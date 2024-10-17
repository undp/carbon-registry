const Document_projet = require("../models/CARBON_REGISTRY").Document_projet;

var _creatDocument_projet = (req, res) => {
  Document_projet = new Document_projet();

  Document_projet.Ref_document_projet = req.body.Ref_document_projet;
  Document_projet.Fichier_madd = req.body.Fichier_madd;
  Document_projet.Fichier_doc_conception = req.body.Fichier_madd;
  Document_projet.Fichier_doc_demande_agrement = req.body.Fichier_doc_demande_agrement;
  Document_projet.Fichier_rapport_validation =
    req.body.Fichier_rapport_validation;
  Document_projet.Id_projet = req.body.Id_projet;
  Document_projet.Id_certificateur_localal = req.body.Id_certificateur_localal;
  Document_projet.Matricule_certificateur_international =
    req.body.Matricule_certificateur_international;
  Document_projet.Nom_certificateur_international =
    req.body.Nom_certificateur_international;
  Document_projet.Statut = "en_attente";
  Document_projet.Date_system = req.body.Date_system;

  Document_projet.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};


//Validation du document de projet 
var _validation_Document_projet = (req, res) => {

    Document_projet.findById(
      req.body.Document_projetid.trim(),
      (err, Document_projet) => {
        Document_projet.Statut = "valide";
        Document_projet.save(function (err) {
          if (err) {
            res.send(err);
          }
  
          res.send("1");
        });
      }
    );
  };


//Non validation du document de projet 


var _non_validation_Document_projet = (req, res) => {
   
    Document_projet.findById(
        req.body.Document_projetid.trim(),
        (err, Document_projet) => {
          Document_projet.Statut = "non_valide";
          Document_projet.save(function (err) {
            if (err) {
              res.send(err);
            }
    
            res.send("1");
          });
        }
      );
  };



var _listDocument_projetbyid = (req, res) => {
  Document_projet.findById(
    req.body.Document_projetid.trim(),
    (err, Document_projet) => {
      if (err) {
        res.send(err);
      }
      res.send(Document_projet);
    }
  );
};

var _listDocument_projet = (req, res) => {
  Document_projet.find((err, Document_projet) => {
    res.send(Document_projet);
  });
};

var _deleteDocument_projet = (req, res) => {
  Document_projet.deleteOne(
    { _id: req.body.Document_projetid.trim() },
    function (err) {
      if (err) {
        req.send(err);
      }
      res.send("1");
    }
  );
};

var _editDocument_projet = (req, res) => {
  Document_projet.findById(
    req.body.Document_projetid.trim(),
    (err, Document_projet) => {
      Document_projet.Ref_document_projet = req.body.Ref_document_projet;
      Document_projet.Fichier_madd = req.body.Fichier_madd;
      Document_projet.Fichier_rapport_validation =
        req.body.Fichier_rapport_validation;
      Document_projet.Id_projet = req.body.Id_projet;
      Document_projet.Id_certificateur_localal =
        req.body.Id_certificateur_localal;
      Document_projet.Matricule_certificateur_international =
        req.body.Matricule_certificateur_international;
      Document_projet.Nom_certificateur_international =
        req.body.Nom_certificateur_international;
      Document_projet.Statut = req.body.Statut;
      Document_projet.Date_system = req.body.Date_system;
      

      Document_projet.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
};

module.exports = {
  creatDocument_projet: _creatDocument_projet,
  listDocument_projetbyid: _listDocument_projetbyid,
  deleteDocument_projet: _deleteDocument_projet,
  listDocument_projet: _listDocument_projet,
  editDocument_projet: _editDocument_projet,
  non_validation_Document_projet:_non_validation_Document_projet,
  validation_Document_projet:_validation_Document_projet
};
