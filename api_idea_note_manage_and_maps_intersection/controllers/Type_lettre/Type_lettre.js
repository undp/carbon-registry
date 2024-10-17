const Type_lettre = require("../models/CARBON_REGISTRY").Type_lettre;

var _creatType_lettre = (req, res) => {
  Type_lettre = new Type_lettre();

  Type_lettre.Ref_type_lettre = req.body.Ref_type_lettre;
  Type_lettre.Libelle_type_lettre = req.body.Libelle_type_lettre;
  Type_lettre.Statut = req.body.Statut;
  Type_lettre.Date_system = req.body.Date_system;

  Type_lettre.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _listType_lettrebyid = (req, res) => {
  Type_lettre.findByid(req.body.Type_lettreid.trim(), (err, Type_lettre) => {
    if (err) {
      res.send(err);
    }
    res.send(Type_lettre);
  });
};
var _listType_lettre = (req, res) => {
  Type_lettre.find((err, Type_lettre) => {
    res.send(Type_lettre);
  });
};

var _deleteType_lettre = (req, res) => {
  Type_lettre.deleteOne({ _id: req.body.Type_lettreid.trim() }, function (err) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editType_lettre = (req, res) => {
  Type_lettre.findByid(req.body.Type_lettreid.trim(), (err, Type_lettre) => {
    Type_lettre.Ref_type_lettre = req.body.Ref_type_lettre;
    Type_lettre.Libelle_type_lettre = req.body.Libelle_type_lettre;
    Type_lettre.Statut = req.body.Statut;
    Type_lettre.Date_system = req.body.Date_system;

    Type_lettre.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatType_lettre: creatType_lettre,
  listType_lettrebyid: listType_lettrebyid,
  deleteType_lettre: deleteType_lettre,
  listType_lettre: listType_lettre,
  editType_lettre: editType_lettre,
};
