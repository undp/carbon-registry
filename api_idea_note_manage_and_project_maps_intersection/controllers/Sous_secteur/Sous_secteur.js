const Sous_secteur = require("../models/CARBON_REGISTRY").Sous_secteur;

var _creatSous_secteur = (req, res) => {
  Sous_secteur = new Sous_secteur();

  Sous_secteur.Ref_sous_secteur = req.body.Ref_sous_secteur;
  Sous_secteur.Libelle_sous_secteur = req.body.Libelle_sous_secteur;
  Sous_secteur.Idsecteur = req.body.Idsecteur;
  Sous_secteur.Date_system = req.body.Date_system;

  Sous_secteur.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _listSous_secteurbyid = (req, res) => {
  Sous_secteur.findByid(req.body.Sous_secteurid.trim(), (err, Sous_secteur) => {
    if (err) {
      res.send(err);
    }
    res.send(Sous_secteur);
  });
};
var _listSous_secteur = (req, res) => {
  Sous_secteur.find((err, Sous_secteur) => {
    res.send(Sous_secteur);
  });
};

var _deleteSous_secteur = (req, res) => {
  Sous_secteur.deleteOne({ _id: req.body.Sous_secteurid.trim() }, function (
    err
  ) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editSous_secteur = (req, res) => {
  Sous_secteur.findByid(req.body.Sous_secteurid.trim(), (err, Sous_secteur) => {
    Sous_secteur.Ref_sous_secteur = req.body.Ref_sous_secteur;
    Sous_secteur.Libelle_sous_secteur = req.body.Libelle_sous_secteur;
    Sous_secteur.Idsecteur = req.body.Idsecteur;
    Sous_secteur.Date_system = req.body.Date_system;

    Sous_secteur.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatSous_secteur: creatSous_secteur,
  listSous_secteurbyid: listSous_secteurbyid,
  deleteSous_secteur: deleteSous_secteur,
  listSous_secteur: listSous_secteur,
  editSous_secteur: editSous_secteur,
};
