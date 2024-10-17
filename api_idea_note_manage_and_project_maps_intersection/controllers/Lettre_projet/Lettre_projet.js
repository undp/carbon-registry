const Lettre_projet = require("../models/CARBON_REGISTRY").Lettre_projet;

var _creatLettre_projet = (req, res) => {
  Lettre_projet = new Lettre_projet();

  Lettre_projet.ref_lettre = req.body.ref_lettre;
  Lettre_projet.Id_type_lettre = req.body.Id_type_lettre;
  Lettre_projet.url_lettre = req.body.url_lettre;
  Lettre_projet.Statut = req.body.Statut;
  Lettre_projet.Id_projet = req.body.Id_projet;
  Lettre_projet.Date_system = req.body.Date_system;

  Lettre_projet.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.send("1");
  });
};

var _listLettre_projetbyid = (req, res) => {
  Lettre_projet.findByid(
    req.body.Lettre_projetid.trim(),
    (err, Lettre_projet) => {
      if (err) {
        res.send(err);
      }
      res.send(Lettre_projet);
    }
  );
};
var _listLettre_projet = (req, res) => {
  Lettre_projet.find((err, Lettre_projet) => {
    res.send(Lettre_projet);
  });
};

var _deleteLettre_projet = (req, res) => {
  Lettre_projet.deleteOne({ _id: req.body.Lettre_projetid.trim() }, function (
    err
  ) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};


var _recevoir_Lettre_confirmation_note_idee = (req, res) => {

  var url_lettre='';
  var Id_signataire='';
  var Lettre_projetid='';

  Lettre_projet.findById(
    Lettre_projetid.trim(),
    (err, Lettre_projet) => {
      Lettre_projet.url_lettre = url_lettre;
      Lettre_projet.Statut = "confirmee";
      Lettre_projet.Id_signataire = Id_signataire;
      Lettre_projet.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
 
  
}



var _envoyer_Lettre_a_organisation = (req, res) => {

  var Lettre_projetid='';


  Lettre_projet.findById(
    Lettre_projetid.trim(),
    (err, Lettre_projet) => {
      Lettre_projet.Statut = "envoyee";
      Lettre_projet.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );

}




var _envoyer_Lettre_au_bureau_marche = async(req, res) => {

  var url_lettre='';
  var Typedoc='';
var Lettre_projetid='';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbiI6IlJlZ2lvbiBkZXMgbGFndW5lcyIsIm4iOiJSb290Iiwic3ViIjo2LCJyIjoiUm9vdCIsImNpZCI6NywiY3IiOiJHb3Zlcm5tZW50IiwicyI6MSwiaWF0IjoxNzE1MjU2NjA0LCJleHAiOjE3MTUyNjM4MDR9.hE0-1Qj5HGIzAderwJkGzQj2Tp42uvu5gfFRbiIskY4';

const config = {
  headers: { Authorization: `Bearer ${token}` }
};


var resultat= await axios.post(apilink+'/request_document_signature', {


 },config);

 if(resultat.data="1"){

  res.json({
    data:"1",
    message:"Lettre envoyée avec succes"
  })
 }else{
  res.json({
    data:"0",
    message:"Erreur d'envoie de la lettre"
  })

 }

}



var _recevoir_Lettre_non_confirmation = (req, res) => {

  var url_lettre='';
  var Id_signataire='';
  var Lettre_projetid='';

  Lettre_projet.findById(
    Lettre_projetid.trim(),
    (err, Lettre_projet) => {
      Lettre_projet.url_lettre = req.body.url_lettre;
      Lettre_projet.Statut = "non_confirmee";
      Lettre_projet.Id_signataire = Id_signataire;
      Lettre_projet.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );


}


var _editLettre_projet = (req, res) => {
  Lettre_projet.findByid(
    req.body.Lettre_projetid.trim(),
    (err, Lettre_projet) => {
      Lettre_projet.ref_lettre = req.body.ref_lettre;
      Lettre_projet.Id_type_lettre = req.body.Id_type_lettre;
      Lettre_projet.url_lettre = req.body.url_lettre;
      Lettre_projet.Statut = req.body.Statut;
      Lettre_projet.Id_projet = req.body.Id_projet;
      Lettre_projet.Date_system = req.body.Date_system;

      Lettre_projet.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
};

module.exports = {
  creatLettre_projet: creatLettre_projet,
  listLettre_projetbyid: listLettre_projetbyid,
  deleteLettre_projet: deleteLettre_projet,
  listLettre_projet: listLettre_projet,
  editLettre_projet: editLettre_projet,
};
