const Recours = require("../models/CARBON_REGISTRY").Recours;

var _creatRecours = (req, res) => {
  Recours = new Recours();

  Recours.ref_recours = req.body.ref_recours;
  Recours.Motif_recour_desc = req.body.Motif_recour_desc;
  Recours.Fichier_joint = req.body.Fichier_joint;
  Recours.Statut = req.body.Statut;
  Recours.Id_type_recour = req.body.Id_type_recour;
  Recours.Id_entite = req.body.Id_entite;

  Recours.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _listRecoursbyid = (req, res) => {
  Recours.findByid(req.body.Recoursid.trim(), (err, Recours) => {
    if (err) {
      res.send(err);
    }
    res.send(Recours);
  });
};
var _listRecours = (req, res) => {
  Recours.find((err, Recours) => {
    res.send(Recours);
  });
};

var _deleteRecours = (req, res) => {
  Recours.deleteOne({ _id: req.body.Recoursid.trim() }, function (err) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editRecours = (req, res) => {
  Recours.findByid(req.body.Recoursid.trim(), (err, Recours) => {
    Recours.ref_recours = req.body.ref_recours;
    Recours.Motif_recour_desc = req.body.Motif_recour_desc;
    Recours.Fichier_joint = req.body.Fichier_joint;
    Recours.Statut = req.body.Statut;
    Recours.Id_type_recour = req.body.Id_type_recour;
    Recours.Id_entite = req.body.Id_entite;

    Recours.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatRecours: creatRecours,
  listRecoursbyid: listRecoursbyid,
  deleteRecours: deleteRecours,
  listRecours: listRecours,
  editRecours: editRecours,
};
