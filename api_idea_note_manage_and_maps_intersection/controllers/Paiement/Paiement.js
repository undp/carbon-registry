const Paiement = require("../../models/CARBON_REGISTRY").Paiement;

const { v4: uuidv4 } = require('uuid');
var _creatPaiement = (req, res) => {
  _Paiement = new Paiement();
  const uniqueID = uuidv4();
  _Paiement.Ref_paiement = "PAIEMENT_"+uniqueID;
  _Paiement.numero_transaction = req.body.numero_transaction;
  _Paiement.Id_type_paiement = req.body.Id_type_paiement;
  _Paiement.Methode_paiement = req.body.Methode_paiement;
  _Paiement.Id_Organisation = req.body.Id_Organisation;
  _Paiement.Statut = "en_attente";
  _Paiement.Date_system = new Date();


  if (req.files['Piece_justificative'] != undefined) {

    for (let index = 0; index < req.files['Piece_justificative'].length; index++) {

      _Paiement.Piece_justificative.push({ Piece_justificative: req.files['Piece_justificative'][index] })

    }

}

  _Paiement.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.json({
      "Ref_paiement":_Paiement.Ref_paiement+"",
    });
  });
};

var _listPaiementbyid = (req, res) => {
  Paiement.findById(req.body.Paiementid.trim(), (err, Paiement) => {
    if (err) {
      res.send(err);
    }
    res.send(Paiement);
  });
};
var _listPaiement = (req, res) => {
  Paiement.find((err, Paiement) => {
    res.send(Paiement);
  });
};


var _listPaiementby_ref_organisation = (req, res) => {
  Paiement.find({Id_Organisation:req.body.Id_Organisation},(err, Paiement) => {
    res.send(Paiement);
  });
};

var _listPaiementby_ref_paiement = (req, res) => {
  Paiement.find({Ref_paiement:req.body.Ref_paiement},(err, Paiement) => {
    res.send(Paiement);
  });
};



var _deletePaiement = (req, res) => {
  Paiement.deleteOne({ _id: req.body.Paiementid.trim() }, function (err) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editPaiement = (req, res) => {
  Paiement.findById(req.body.Paiementid.trim(), (err, Paiement) => {

    Paiement.Date_system = new Date();

    
  if (req.files['Piece_justificative'] != undefined) {

    for (let index = 0; index < req.files['Piece_justificative'].length; index++) {

      Paiement.Piece_justificative.push({ Piece_justificative: req.files['Piece_justificative'][index] })

    }
}

if(req.body.numero_transaction!=undefined && req.body.numero_transaction!="" ){

  Paiement.numero_transaction = req.body.numero_transaction;

}

   
if(req.body.Id_type_paiement!=undefined && req.body.Id_type_paiement!="" ){

  Paiement.Id_type_paiement = req.body.Id_type_paiement;

}


if(req.body.Methode_paiement!=undefined && req.body.Methode_paiement!="" ){

  Paiement.Methode_paiement = req.body.Methode_paiement;

}

if(req.body.Id_Organisation!=undefined && req.body.Id_Organisation!="" ){

  Paiement.Id_Organisation = req.body.Id_Organisation;

}

if(req.body.Statut!=undefined && req.body.Statut!="" ){

  Paiement.Statut = req.body.Statut;

}
    Paiement.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatPaiement: _creatPaiement,
  listPaiementbyid: _listPaiementbyid,
  deletePaiement: _deletePaiement,
  listPaiement: _listPaiement,
  editPaiement: _editPaiement,
  _listPaiementby_ref_organisation:_listPaiementby_ref_organisation,
  _listPaiementby_ref_paiement:_listPaiementby_ref_paiement
};
