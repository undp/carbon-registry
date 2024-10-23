const Lettre_note_idee = require("../../models/CARBON_REGISTRY")
  .Lettre_note_idee;
const axios = require("axios");
const apilink = "http://localhost:3000";
var _creatLettre_note_idee = (req, res) => {
  Lettre_note_idee = new Lettre_note_idee();

  Lettre_note_idee.ref_lettre = req.body.ref_lettre;
  Lettre_note_idee.Id_type_lettre = req.body.Id_type_lettre;
  Lettre_note_idee.url_lettre = req.body.url_lettre;
  Lettre_note_idee.Statut = req.body.Statut;
  Lettre_note_idee.Id_note_idee = req.body.Id_note_idee;
  Lettre_note_idee.Date_system = req.body.Date_system;

  Lettre_note_idee.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _recevoir_Lettre_confirmation_note_idee = (req, res) => {
  var url_lettre = "";
  var Id_signataire = "";
  var Id_note_idee = "";

  Lettre_note_idee.findById(Id_note_idee.trim(), (err, Lettre_note_idee) => {
    Lettre_note_idee.url_lettre = url_lettre;
    Lettre_note_idee.Statut = "confirmee";
    Lettre_note_idee.Id_signataire = Id_signataire;
    Lettre_note_idee.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });

  // Création du compte de l'organisation dans le registre carbone
};

var _envoyer_Lettre_note_idee_a_organisation = (req, res) => {
  var Id_note_idee = "";

  Lettre_note_idee.findById(Id_note_idee.trim(), (err, Lettre_note_idee) => {
    Lettre_note_idee.Statut = "envoyee";
    Lettre_note_idee.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

var _envoyer_Lettre_note_idee_au_bureau_marche = async (req, res) => {
  var url_lettre = "";
  var Typedoc = "";
  var Id_note_idee = "";

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbiI6IlJlZ2lvbiBkZXMgbGFndW5lcyIsIm4iOiJSb290Iiwic3ViIjo2LCJyIjoiUm9vdCIsImNpZCI6NywiY3IiOiJHb3Zlcm5tZW50IiwicyI6MSwiaWF0IjoxNzE1MjU2NjA0LCJleHAiOjE3MTUyNjM4MDR9.hE0-1Qj5HGIzAderwJkGzQj2Tp42uvu5gfFRbiIskY4";

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  var resultat = await axios.post(
    apilink + "/request_document_signature",
    {},
    config
  );

  if ((resultat.data = "1")) {
    res.json({
      data: "1",
      message: "Lettre envoyée avec succes",
    });
  } else {
    res.json({
      data: "0",
      message: "Erreur d'envoie de la lettre",
    });
  }
};

var _recevoir_Lettre_non_confirmation_note_idee = (req, res) => {
  var url_lettre = "";
  var Id_signataire = "";
  var Id_note_idee = "";

  Lettre_note_idee.findById(Id_note_idee.trim(), (err, Lettre_note_idee) => {
    Lettre_note_idee.url_lettre = url_lettre;
    Lettre_note_idee.Statut = "non_confirmee";
    Lettre_note_idee.Id_signataire = Id_signataire;
    Lettre_note_idee.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

var _listLettre_note_ideebyid = (req, res) => {
  Lettre_note_idee.findByid(
    req.body.Lettre_note_ideeid.trim(),
    (err, Lettre_note_idee) => {
      if (err) {
        res.send(err);
      }
      res.send(Lettre_note_idee);
    }
  );
};
var _listLettre_note_idee = (req, res) => {
  Lettre_note_idee.find((err, Lettre_note_idee) => {
    res.send(Lettre_note_idee);
  });
};

var _deleteLettre_note_idee = (req, res) => {
  Lettre_note_idee.deleteOne(
    { _id: req.body.Lettre_note_ideeid.trim() },
    function (err) {
      if (err) {
        req.send(err);
      }
      res.send("1");
    }
  );
};

var _editLettre_note_idee = (req, res) => {
  Lettre_note_idee.findByid(
    req.body.Lettre_note_ideeid.trim(),
    (err, Lettre_note_idee) => {
      Lettre_note_idee.ref_lettre = req.body.ref_lettre;
      Lettre_note_idee.Id_type_lettre = req.body.Id_type_lettre;
      Lettre_note_idee.url_lettre = req.body.url_lettre;
      Lettre_note_idee.Statut = req.body.Statut;
      Lettre_note_idee.Id_note_idee = req.body.Id_note_idee;
      Lettre_note_idee.Date_system = req.body.Date_system;

      Lettre_note_idee.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
};

module.exports = {
  creatLettre_note_idee: _creatLettre_note_idee,
  listLettre_note_ideebyid: _listLettre_note_ideebyid,
  deleteLettre_note_idee: _deleteLettre_note_idee,
  listLettre_note_idee: _listLettre_note_idee,
  editLettre_note_idee: _editLettre_note_idee,
  recevoir_Lettre_confirmation_note_idee: _recevoir_Lettre_confirmation_note_idee,
  envoyer_Lettre_note_idee_a_organisation: _envoyer_Lettre_note_idee_a_organisation,
  recevoir_Lettre_non_confirmation_note_idee: _recevoir_Lettre_non_confirmation_note_idee,
  envoyer_Lettre_note_idee_au_bureau_marche: _envoyer_Lettre_note_idee_au_bureau_marche,
};
