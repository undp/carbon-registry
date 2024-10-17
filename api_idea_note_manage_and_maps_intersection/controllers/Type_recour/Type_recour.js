const Type_recour = require("../models/CARBON_REGISTRY").Type_recour;

var _creatType_recour = (req, res) => {
  Type_recour = new Type_recour();

  Type_recour.ref_type_recour = req.body.ref_type_recour;
  Type_recour.url_model_recour = req.body.url_model_recour;
  Type_recour.libelle_type_recour = req.body.libelle_type_recour;
  Type_recour.Statut = req.body.Statut;
  Type_recour.Code_recour = req.body.Code_recour;
  Type_recour.Date_system = req.body.Date_system;

  Type_recour.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _listType_recourbyid = (req, res) => {
  Type_recour.findByid(req.body.Type_recourid.trim(), (err, Type_recour) => {
    if (err) {
      res.send(err);
    }
    res.send(Type_recour);
  });
};
var _listType_recour = (req, res) => {
  Type_recour.find((err, Type_recour) => {
    res.send(Type_recour);
  });
};

var _deleteType_recour = (req, res) => {
  Type_recour.deleteOne({ _id: req.body.Type_recourid.trim() }, function (err) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editType_recour = (req, res) => {
  Type_recour.findByid(req.body.Type_recourid.trim(), (err, Type_recour) => {
    Type_recour.ref_type_recour = req.body.ref_type_recour;
    Type_recour.url_model_recour = req.body.url_model_recour;
    Type_recour.libelle_type_recour = req.body.libelle_type_recour;
    Type_recour.Statut = req.body.Statut;
    Type_recour.Code_recour = req.body.Code_recour;
    Type_recour.Date_system = req.body.Date_system;

    Type_recour.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatType_recour: creatType_recour,
  listType_recourbyid: listType_recourbyid,
  deleteType_recour: deleteType_recour,
  listType_recour: listType_recour,
  editType_recour: editType_recour,
};
