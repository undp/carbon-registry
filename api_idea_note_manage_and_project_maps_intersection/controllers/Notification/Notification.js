const Notification = require("../models/CARBON_REGISTRY").Notification;

var _creatNotification = (req, res) => {
  Notification = new Notification();

  Notification.Ref_notification = req.body.Ref_notification;
  Notification.Titre_notification = req.body.Titre_notification;
  Notification.Id_type_notification = req.body.Id_type_notification;
  Notification.Id_Organisation = req.body.Id_Organisation;
  Notification.Statut = req.body.Statut;
  Notification.Date_system = req.body.Date_system;

  Notification.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.send("1");
  });
};

var _listNotificationbyid = (req, res) => {
  Notification.findByid(req.body.Notificationid.trim(), (err, Notification) => {
    if (err) {
      res.send(err);
    }
    res.send(Notification);
  });
};
var _listNotification = (req, res) => {
  Notification.find((err, Notification) => {
    res.send(Notification);
  });
};

var _deleteNotification = (req, res) => {
  Notification.deleteOne({ _id: req.body.Notificationid.trim() }, function (
    err
  ) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editNotification = (req, res) => {
  Notification.findByid(req.body.Notificationid.trim(), (err, Notification) => {
    Notification.Ref_notification = req.body.Ref_notification;
    Notification.Titre_notification = req.body.Titre_notification;
    Notification.Id_type_notification = req.body.Id_type_notification;
    Notification.Id_Organisation = req.body.Id_Organisation;
    Notification.Statut = req.body.Statut;
    Notification.Date_system = req.body.Date_system;

    Notification.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

module.exports = {
  creatNotification: creatNotification,
  listNotificationbyid: listNotificationbyid,
  deleteNotification: deleteNotification,
  listNotification: listNotification,
  editNotification: editNotification,
};
