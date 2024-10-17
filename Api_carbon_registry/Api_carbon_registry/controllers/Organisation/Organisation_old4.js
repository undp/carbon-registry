const Organisation = require("../../models/CARBON_REGISTRY").Organisation;

const { v4: uuidv4 } = require('uuid');
var _creatOrganisation = (req, res) => {
  _Organisation = new Organisation();
  const uniqueID = uuidv4();
  _Organisation.Ref_organisation = "SOUMISSIONNAIRE_"+uniqueID;
  _Organisation.Denomination_organisation = req.body.Denomination_organisation;
  _Organisation.Site_web_organisation = req.body.Site_web_organisation;
  _Organisation.Email_organisation = req.body.Email_organisation;
  _Organisation.Numero_tel_organisation = req.body.Numero_tel_organisation;
  _Organisation.Email_admin_organisation = req.body.Email_admin_organisation;
  _Organisation.Numero_tel_admin_organisation =
    req.body.Numero_tel_admin_organisation;
  _Organisation.Statut_organisation = "soumissionneur";
  _Organisation.Id_registre_organisation = req.body.Id_registre_organisation;

  _Organisation.Mot_de_passe_temporaire_admin=generateTemporaryPassword(10);
  _Organisation.Date_system = new Date();

  _Organisation.Date_creation = new Date();

  
  if (req.files['DFE'] != undefined) {

    for (let index = 0; index < req.files['DFE'].length; index++) {

      _Organisation.Fichier.push({ DFE: req.files['DFE'][index] })

    }

}

if (req.files['RCCM'] != undefined) {

  for (let index = 0; index < req.files['RCCM'].length; index++) {

    _Organisation.Fichier.push({ RCCM: req.files['RCCM'][index] })

  }

}


if (req.files['Logo_organisation'] != undefined) {

  for (let index = 0; index < req.files['Logo_organisation'].length; index++) {

    _Organisation.Fichier.push({ Logo_organisation: req.files['Logo_organisation'][index] })

  }

}

console.log("Voici la liste des fichiers ici ")
console.log(req.files);


send_email(_Organisation.Email_admin_organisation,_Organisation.Mot_de_passe_temporaire_admin);

  _Organisation.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.json({
      "Reference_organisation":_Organisation.Ref_organisation+"",
    });
  });
};

function generateTemporaryPassword(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
  }
  return password;
}


var _listOrganisationbyid = (req, res) => {
  Organisation.findById(req.body.Organisationid.trim(), (err, Organisation) => {
    if (err) {
      res.send(err);
    }
    res.send(Organisation);
  });
};
var _listOrganisation = (req, res) => {
  Organisation.find((err, Organisation) => {
    res.send(Organisation);
  });
};


var _listOrganisationbyref = (req, res) => {
  Organisation.find({Ref_organisation:req.body.Ref_organisation},(err, Organisation) => {
    res.send(Organisation);
  });
};

var _deleteOrganisation = (req, res) => {
  Organisation.deleteOne({ _id: req.body.Organisationid.trim() }, function (
    err
  ) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editOrganisation = (req, res) => {
  Organisation.findById(req.body.Organisationid.trim(), (err, Organisation) => {

    if(req.body.Denomination_organisation!=undefined && req.body.Denomination_organisation!="" ){

      Organisation.Denomination_organisation = req.body.Denomination_organisation;

   }
   
   if(req.body.Site_web_organisation!=undefined && req.body.Site_web_organisation!="" ){

    Organisation.Site_web_organisation = req.body.Site_web_organisation;

 }

 
 if(req.body.Email_organisation!=undefined && req.body.Email_organisation!="" ){

  Organisation.Email_organisation = req.body.Email_organisation;

}


 
if(req.body.Numero_tel_organisation!=undefined && req.body.Numero_tel_organisation!="" ){

  Organisation.Numero_tel_organisation = req.body.Numero_tel_organisation;

}



if(req.body.Email_admin_organisation!=undefined && req.body.Email_admin_organisation!="" ){

  Organisation.Email_admin_organisation = req.body.Email_admin_organisation;

}


if(req.body.Numero_tel_admin_organisation!=undefined && req.body.Numero_tel_admin_organisation!="" ){

  Organisation.Numero_tel_admin_organisation = req.body.Numero_tel_admin_organisation;

}

if(req.body.Statut_organisation!=undefined && req.body.Statut_organisation!="" ){

  Organisation.Statut_organisation = req.body.Statut_organisation;

}



if(req.body.Id_registre_organisation!=undefined && req.body.Id_registre_organisation!="" ){

  Organisation.Id_registre_organisation = req.body.Id_registre_organisation;

}

if(req.body.Id_registre_organisation!=undefined && req.body.Id_registre_organisation!="" ){

  Organisation.Id_registre_organisation = req.body.Id_registre_organisation;

}


if (req.files['RCCM'] != undefined && req.files!= undefined) {

  for (let index = 0; index < req.files['RCCM'].length; index++) {

    _Organisation.Fichier.push({ RCCM: req.files['RCCM'][index] })

  }

}


if (req.files['Logo_organisation'] != undefined && req.files!= undefined ) {

  for (let index = 0; index < req.files['Logo_organisation'].length; index++) {

    _Organisation.Fichier.push({ Logo_organisation: req.files['Logo_organisation'][index] })

  }

}


if (req.files['DFE'] != undefined && req.files!= undefined) {

  for (let index = 0; index < req.files['DFE'].length; index++) {

    _Organisation.Fichier.push({ DFE: req.files['DFE'][index] })

  }

}


if(req.body.Id_registre_organisation!=undefined && req.body.Id_registre_organisation!="" ){

  Organisation.Id_registre_organisation = req.body.Id_registre_organisation;

}
    Organisation.Date_system = new Date();
    Organisation.Date_update = new Date();
    

    Organisation.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};



function  send_email(email,mdps_temp){

  //console.log("L'email du client est : "+req.body.email_client)
    nodemailer=require('nodemailer');
  // Create a transporter using SMTP or other transport mechanisms
  const transporter = nodemailer.createTransport({
      host: "mail41.lwspanel.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'roger.doffou@skyvisionafrica.com',
        pass: 'Foryou@2020'
      }
    });
  // Email content
  const mailOptions = {

    from: "🇨🇮Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>", // Sender address
    to:`${ email}`, // List of recipients
    subject: "ACCUSÉ DE RÉCEPTION ET ACCÈS TEMPORAIRE DE CONNEXION", // Subject line // Plain text body
    html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>ACCUSÉ DE RÉCEPTION ET ACCÈS TEMPORAIRE DE CONNEXION</h2>
        <p>Nous accusons réception de votre note d'idée.</p>
        <p>Nous espérons que vous avez pris connaissance des critères d'éligibilité avant la soumission.</p>
        <p>Vous avez un délai de <span class="highlight">1 mois</span> pour faire toutes les modifications sur la note d'idée soumise.</p>
        <p>En cas de modification, veuillez vous connecter à la plateforme d'éligibilité au lien suivant : 
            <a href="https://registrecarbone.ci.skyvisionafrica.com/eligibilite" style="color: #aad8d3;">https://registrecarbone.ci.skyvisionafrica.com/eligibilite</a>
        </p>
        <p>avec votre email de soumission et votre mot de passe temporaire : <span class="highlight">${mdps_temp}</span></p>
        <p>Bonne réception,<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
      `, // HTML body

  };
  
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      res.send("1")
      console.log('Email sent:', info.response);
    }
  });
}

var _connexionOrganisation=(req,res)=>{

  Organisation.find({
    Email_admin_organisation:req.body.Email_admin_organisation,
    Mot_de_passe_temporaire_admin:req.body.Mot_de_passe_temporaire_admin
  },(err, Organisation) => {

      res.send(Organisation);
  })

}






module.exports = {
  creatOrganisation: _creatOrganisation,
  listOrganisationbyid: _listOrganisationbyid,
  deleteOrganisation: _deleteOrganisation,
  listOrganisation: _listOrganisation,
  editOrganisation: _editOrganisation,
  connexionOrganisation:_connexionOrganisation,
  listOrganisationbyref:_listOrganisationbyref
};
