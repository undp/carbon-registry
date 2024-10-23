const Note_idee = require("../../models/CARBON_REGISTRY").Note_idee;
var apilink = "http://localhost:3005";
var apilink_local = "http://localhost:3005";
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
var _creatNote_idee = (req, res) => {
  _Note_idee = new Note_idee();
  const uniqueID = uuidv4();
  _Note_idee.Ref_note_idee = "NOTE_IDEE_CI_" + uniqueID;
  _Note_idee.Idpayement = req.body.Idpayement;
  _Note_idee.Intitule_projet = req.body.Intitule_projet;
  _Note_idee.Statut = "en_attente";
  _Note_idee.Id_organisation = req.body.Id_organisation;
  _Note_idee.Commentaire_recours = req.body.Commentaire_recours;
  console.log("Voici le fichier envoyé ");
  console.log(req.body);
  console.log(req.files);

  if (req.files["Note_idee"] != undefined && req.files != undefined) {
    for (let index = 0; index < req.files["Note_idee"].length; index++) {
      _Note_idee.Note_idee.push({ Note_idee: req.files["Note_idee"][index] });
    }
  }

  if (req.files["Document_conformite"] != undefined && req.files != undefined) {
    for (
      let index = 0;
      index < req.files["Document_conformite"].length;
      index++
    ) {
      _Note_idee.Document_conformite.push({
        Document_conformite: req.files["Document_conformite"][index],
      });
    }
  }

  _Note_idee.Date_creation = new Date();
  _Note_idee.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.json({
      Ref_note_idee: _Note_idee.Ref_note_idee + "",
    });
  });
};

//Valider un note d'idée

var _valider_Note_idee = (req, res) => {
  Note_idee.findById(req.body.Note_ideeid.trim(), (err, Note_idee) => {
    Note_idee.Statut = "validee";
    Note_idee.Date_update = new Date();
    Note_idee.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

// Rejeter une note d'idée

var _rejeter_Note_idee = (req, res) => {
  Note_idee.findById(req.body.Note_ideeid.trim(), (err, Note_idee) => {
    Note_idee.Statut = "rejetee";
    Note_idee.Date_update = new Date();
    Note_idee.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

function generateUniqueID() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime(); // Get timestamp
  const uniqueID = `NOTE_CI_${timestamp}_${Math.random()
    .toString(36)
    .substr(2, 9)}`; // Concatenate timestamp with a random string
  return uniqueID;
}

var _listNote_ideebyid = (req, res) => {
  Note_idee.findById(req.body.Note_ideeid.trim(), (err, Note_idee) => {
    if (err) {
      res.send(err);
    }
    res.send(Note_idee);
  });
};

var _listNote_idee = (req, res) => {
  Note_idee.find((err, Note_idee) => {
    res.send(Note_idee);
  });
};

var _listNote_idee_by_organisation = (req, res) => {
  Note_idee.find(
    {
      Id_organisation: req.body.Id_organisation,
    },
    (err, Note_idee) => {
      res.send(Note_idee);
    }
  );
};

var _listNote_idee_by_ref = (req, res) => {
  Note_idee.find(
    { Ref_note_idee: req.body.Ref_note_idee },
    (err, Note_idee) => {
      res.send(Note_idee);
    }
  );
};

// Liste des notes d'idée par Reference formatée
var _listNote_idee_by_ref_formate = (req, res) => {
  Note_idee.find(
    { Ref_note_idee: req.body.Ref_note_idee },
    async (err, Note_idee) => {
      console.log("Note d'Idée à formater");
      console.log(Note_idee);

      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYyMzk2NDEsImV4cCI6NDg2OTgzOTY0MX0.7UNOZ4TWgWB6Ml1IFfzHtyGwrsvB4NAp-XGMU_1EQPg";

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      var Organisation = await axios.post(
        apilink_local + "/users/apiv1/listOrganisationbyref",
        {
          Ref_organisation: Note_idee[0].Id_organisation,
        },
        config
      );

      var Paiement = await axios.post(
        apilink_local + "/users/apiv1/listPaiementby_ref_paiement",
        {
          Ref_paiement: Note_idee[0].Idpayement,
        },
        config
      );

      var logo = "";
      var DFE = "";
      var RCCM = "";
      format_note = [];
      Organisation1 = [];
      Paiement1 = [];
      Note_idee1 = [];
      Commentaire_recours = "";

      if (Note_idee[0].Commentaire_recours != undefined) {
        Commentaire_recours = Note_idee[0].Commentaire_recours;
      } else {
        Commentaire_recours = "";
      }

      var piece_justif = "";
      var note_idee = "";
      var document_conformite = "";
      if (Paiement.data.length > 0) {
        if (Paiement.data[0].Piece_justificative.length > 0) {
          piece_justif =
            Paiement.data[0].Piece_justificative[0].Piece_justificative.path;
        }

        Paiement1.push({
          numero_transaction: Paiement.data[0].numero_transaction,
          methode_paiement: Paiement.data[0].Methode_paiement,
          piece_justif: piece_justif,
        });
      }

      if (Note_idee.length > 0) {
        if (Note_idee[0].Document_conformite.length > 0) {
          document_conformite =
            apilink_local +
            "/" +
            Note_idee[0].Document_conformite[0].Document_conformite.path;
        }

        if (Note_idee[0].Note_idee.length > 0) {
          note_idee =
            apilink_local + "/" + Note_idee[0].Note_idee[0].Note_idee.path;
        }

        Note_idee1.push({
          ref_note_idee: Note_idee[0].Ref_note_idee,
          statut: Note_idee[0].Statut,
          id_note_idee: Note_idee[0]._id,
          date_creation: Note_idee[0].Date_creation,
          document_conformite: document_conformite,
          note_idee: note_idee,
          Commentaire_recours: Commentaire_recours,
        });
      }

      if (Organisation.data.length > 0) {
        if (Organisation.data[0].Fichier.length > 2) {
          logo =
            apilink_local +
            "/" +
            Organisation.data[0].Fichier[2].Logo_organisation.path;
        }
        if (Organisation.data[0].Fichier.length > 2) {
          DFE = apilink_local + "/" + Organisation.data[0].Fichier[0].DFE.path;
        }
        if (Organisation.data[0].Fichier.length > 2) {
          RCCM =
            apilink_local + "/" + Organisation.data[0].Fichier[1].RCCM.path;
        }
        Organisation1.push({
          logo: logo,
          DFE: DFE,
          RCCM: RCCM,
          denomination: Organisation.data[0].Denomination_organisation,
          site_web: Organisation.data[0].Site_web_organisation,
          email_organisation: Organisation.data[0].Email_organisation,
          numero_tel_organisation: Organisation.data[0].Numero_tel_organisation,
          email_admin_organisation:
            Organisation.data[0].Email_admin_organisation,
          numero_tel_admin_organisation:
            Organisation.data[0].Numero_tel_admin_organisation,
        });
      }

      if (Note_idee1.length > 0) {
        format_note.push({
          ref_note_idee: Note_idee1[0].ref_note_idee,
          id_note_idee: Note_idee1[0].id_note_idee,
          statut: Note_idee1[0].statut,
          date_creation: Note_idee1[0].date_creation,
          document_conformite: Note_idee1[0].document_conformite,
          note_idee: Note_idee1[0].note_idee,
          Commentaire_recours: Commentaire_recours,
        });
      }

      if (Paiement1.length > 0) {
        format_note.push({
          numero_transaction: Paiement1[0].numero_transaction,
          methode_paiement: Paiement1[0].methode_paiement,
          piece_justif: Paiement1[0].piece_justif,
        });
      }

      if (Organisation1.length > 0) {
        format_note.push({
          logo: Organisation1[0].logo,
          DFE: Organisation1[0].DFE,
          RCCM: Organisation1[0].RCCM,
          denomination: Organisation1[0].denomination,
          site_web: Organisation1[0].site_web,
          email_organisation: Organisation1[0].email_organisation,
          numero_tel_organisation: Organisation1[0].numero_tel_organisation,
          email_admin_organisation: Organisation1[0].email_admin_organisation,
          numero_tel_admin_organisation:
            Organisation1[0].numero_tel_admin_organisation,
        });
      }

      res.send(format_note);
    }
  );
};

//Liste des notes idée par page avec filtre par date

const _listNoteIdee_by_date_filter = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;

    // Date filter parameters
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    // Validate and convert date strings to Date objects
    if (startDate) {
      startDate = new Date(startDate);
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({ error: "Invalid start date format" });
      }
    }

    if (endDate) {
      endDate = new Date(endDate);
      if (isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Invalid end date format" });
      }
    }
    // Constructing query
    let query = {};

    if (startDate && endDate) {
      // Assuming date is stored in a field named 'createdAt', modify this according to your schema
      query.Date_creation = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Count total pages
    const totalCount = await Note_idee.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    // Fetching notes with pagination and filtering
    const notes = await Note_idee.find(query)
      .sort({ Date_creation: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // Sending response with total pages, start date, and end date
    res.json({
      totalPages: totalPages,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

var _deleteNote_idee = (req, res) => {
  Note_idee.deleteOne({ _id: req.body.Note_ideeid.trim() }, function (err) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var liste_all_note_formated = async (req, res) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYyMzk2NDEsImV4cCI6NDg2OTgzOTY0MX0.7UNOZ4TWgWB6Ml1IFfzHtyGwrsvB4NAp-XGMU_1EQPg";

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  var resultat = await axios.post(
    apilink + "/users/apiv1/listNoteIdee_by_date_filter",
    {
      page: req.body.page,
      limit: req.body.limit,
    },
    config
  );
  var format_note = [];

  if (resultat.data) {
    if (resultat.data.notes.length > 0) {
      for (let k = 0; k < resultat.data.notes.length; k++) {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9jYXJib25fcmVnaXN0cnkiLCJpYXQiOjE3MTYyMzk2NDEsImV4cCI6NDg2OTgzOTY0MX0.7UNOZ4TWgWB6Ml1IFfzHtyGwrsvB4NAp-XGMU_1EQPg";

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        var Organisation = await axios.post(
          apilink + "/users/apiv1/listOrganisationbyref",
          {
            Ref_organisation: resultat.data.notes[k].Id_organisation,
          },
          config
        );

        var logo = "";
        if (Organisation.data.length > 0) {
          if (Organisation.data[0].Fichier.length > 2) {
            logo =
              apilink +
              "/" +
              Organisation.data[0].Fichier[2].Logo_organisation.path;

            format_note.push({
              logo: logo,
              denomination: Organisation.data[0].Denomination_organisation,
              ref_note_idee: resultat.data.notes[k].Ref_note_idee,
              Statut: resultat.data.notes[k].Statut,
              date_soumission: format_date(
                resultat.data.notes[k].Date_creation
              ),
            });
          }
        }
      }
    }
  }
  res.send(format_note);
};

function format_date(date) {
  const dateStr = date;

  // Create a new Date object from the date-time string
  const dateObj = new Date(dateStr);

  // Extract the day, month, and year from the Date object
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1; // Months are zero-indexed
  const year = dateObj.getUTCFullYear();

  // Format the day and month to always have two digits
  const formattedDay = day.toString().padStart(2, "0");
  const formattedMonth = month.toString().padStart(2, "0");

  // Construct the French date format
  const frenchDateStr = `${formattedDay}/${formattedMonth}/${year}`;

  return frenchDateStr; // Outputs: 20/05/2024
}

var _editNote_idee = (req, res) => {
  Note_idee.findById(req.body.Note_ideeid.trim(), (err, Note_idee) => {
    Note_idee.Date_update = new Date();

    if (req.body.Idpayement != undefined && req.body.Idpayement != "") {
      Note_idee.Idpayement = req.body.Idpayement;
    }

    if (
      req.body.Id_organisation != undefined &&
      req.body.Id_organisation != ""
    ) {
      Note_idee.Id_organisation = req.body.Id_organisation;
    }

    if (req.body.Statut != undefined && req.body.Statut != "") {
      Note_idee.Statut = req.body.Statut;
    }

    if (req.files["Note_idee"] != undefined && req.files != undefined) {
      for (let index = 0; index < req.files["Note_idee"].length; index++) {
        Note_idee.Note_idee = { Note_idee: req.files["Note_idee"][index] };
      }
    }
    if (
      req.body.Commentaire_recours != undefined &&
      req.body.Commentaire_recours != ""
    ) {
      Note_idee.Commentaire_recours = req.body.Commentaire_recours;
    }
    if (
      req.body.Intitule_projet != undefined &&
      req.body.Intitule_projet != ""
    ) {
      Note_idee.Intitule_projet = req.body.Intitule_projet;
    }

    if (
      req.files["Document_conformite"] != undefined &&
      req.files != undefined
    ) {
      for (
        let index = 0;
        index < req.files["Document_conformite"].length;
        index++
      ) {
        Note_idee.Document_conformite = {
          Document_conformite: req.files["Document_conformite"][index],
        };
      }
    }
    Note_idee.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatNote_idee: _creatNote_idee,
  listNote_ideebyid: _listNote_ideebyid,
  deleteNote_idee: _deleteNote_idee,
  listNote_idee: _listNote_idee,
  editNote_idee: _editNote_idee,
  _listNoteIdee_by_date_filter: _listNoteIdee_by_date_filter,
  _valider_Note_idee: _valider_Note_idee,
  _rejeter_Note_idee: _rejeter_Note_idee,
  _listNote_idee_by_ref: _listNote_idee_by_ref,
  _listNote_idee_by_organisation: _listNote_idee_by_organisation,
  liste_all_note_formated: liste_all_note_formated,
  listNote_idee_by_ref_formate: _listNote_idee_by_ref_formate,
};
