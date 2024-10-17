const Type_paiement = require("../../models/CARBON_REGISTRY").Type_paiement;

const { v4: uuidv4 } = require('uuid');
var _creatType_paiement = (req, res) => {
  _Type_paiement = new Type_paiement();
  const uniqueID = uuidv4();
  _Type_paiement.Ref_type_paiement = "TYPE_PAIEMENT_"+uniqueID;
  _Type_paiement.Libelle_type_paiement = req.body.Libelle_type_paiement;
  _Type_paiement.Ref_paiement = req.body.Ref_paiement;
  _Type_paiement.Montant_type_paiement = req.body.Montant_type_paiement;
  _Type_paiement.Statut = "valide";
  _Type_paiement.Date_system = new Date;

  _Type_paiement.save(function (err) {
    if (err) {
      res.send(err);
    }
    
    res.json({
      "Ref_Type_paiement":_Type_paiement.Ref_type_paiement+"",
    });
  });

};

var _listType_paiementbyid = (req, res) => {
  Type_paiement.findById(
    req.body.Type_paiementid.trim(),
    (err, Type_paiement) => {
      if (err) {
        res.send(err);
      }
      res.send(Type_paiement);
    }
  );
};
var _listType_paiement = (req, res) => {
  Type_paiement.find((err, Type_paiement) => {
    res.send(Type_paiement);
  });
};


var _listType_paiementby_ref = (req, res) => {
  Type_paiement.find({Ref_type_paiement:req.body.Ref_type_paiement},(err, Type_paiement) => {
    res.send(Type_paiement);
  });
};

var _deleteType_paiement = (req, res) => {
  Type_paiement.deleteOne({ _id: req.body.Type_paiementid.trim() }, function (
    err
  ) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editType_paiement = (req, res) => {
  Type_paiement.findById(
    req.body.Type_paiementid.trim(),
    (err, Type_paiement) => {

      Type_paiement.Ref_type_paiement = req.body.Ref_type_paiement;
      Type_paiement.Libelle_type_paiement = req.body.Libelle_type_paiement;
      Type_paiement.Ref_paiement = req.body.Ref_paiement;
      Type_paiement.Montant_type_paiement = req.body.Montant_type_paiement;
      Type_paiement.Statut = "valide";
      Type_paiement.Date_system = new Date();

      Type_paiement.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
};

module.exports = {
  creatType_paiement: _creatType_paiement,
  listType_paiementbyid: _listType_paiementbyid,
  deleteType_paiement: _deleteType_paiement,
  listType_paiement: _listType_paiement,
  editType_paiement: _editType_paiement,
  _listType_paiementby_ref:_listType_paiementby_ref
};
