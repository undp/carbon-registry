const Type_notification = require("../models/CARBON_REGISTRY")
  .Type_notification;

var _creatType_notification = (req, res) => {
  Type_notification = new Type_notification();

  Type_notification.Ref_type_notification = req.body.Ref_type_notification;
  Type_notification.Code_notification = req.body.Code_notification;
  Type_notification.Libelle_notification = req.body.Libelle_notification;
  Type_notification.Contenu_notification = req.body.Contenu_notification;
  Type_notification.Statut = req.body.Statut;
  Type_notification.Date_system = req.body.Date_system;

  Type_notification.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _listType_notificationbyid = (req, res) => {
  Type_notification.findByid(
    req.body.Type_notificationid.trim(),
    (err, Type_notification) => {
      if (err) {
        res.send(err);
      }
      res.send(Type_notification);
    }
  );
};
var _listType_notification = (req, res) => {
  Type_notification.find((err, Type_notification) => {
    res.send(Type_notification);
  });
};

var _deleteType_notification = (req, res) => {
  Type_notification.deleteOne(
    { _id: req.body.Type_notificationid.trim() },
    function (err) {
      if (err) {
        req.send(err);
      }
      res.send("1");
    }
  );
};

var _editType_notification = (req, res) => {
  Type_notification.findByid(
    req.body.Type_notificationid.trim(),
    (err, Type_notification) => {
      Type_notification.Ref_type_notification = req.body.Ref_type_notification;
      Type_notification.Code_notification = req.body.Code_notification;
      Type_notification.Libelle_notification = req.body.Libelle_notification;
      Type_notification.Contenu_notification = req.body.Contenu_notification;
      Type_notification.Statut = req.body.Statut;
      Type_notification.Date_system = req.body.Date_system;

      Type_notification.save(function (err) {
        if (err) {
          res.send(err);
        }

        res.send("1");
      });
    }
  );
};

module.exports = {
  creatType_notification: creatType_notification,
  listType_notificationbyid: listType_notificationbyid,
  deleteType_notification: deleteType_notification,
  listType_notification: listType_notification,
  editType_notification: editType_notification,
};
