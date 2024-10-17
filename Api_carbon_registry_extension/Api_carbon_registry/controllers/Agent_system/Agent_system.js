const Agent_system = require("../../models/CARBON_REGISTRY").Agent_system;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var _creatAgent_system = (req, res) => {
  _Agent_system = new Agent_system();

  _Agent_system.Libelle = req.body.Libelle;

  var token=generateAccessToken({intitule:req.body.Libelle});

  _Agent_system.Token =token;
  _Agent_system.Identifiant = req.body.Identifiant;
  _Agent_system.Date_system = req.body.Date_system;
  _Agent_system.save(function (err) {
    if (err) {
      res.send(err);
    }

    res.json({
      "libelle":req.body.Libelle,
      "token":token
    });
  });
};

var _listAgent_systembyid = (req, res) => {
  Agent_system.findById(req.body.Agent_systemid.trim(), (err, Agent_system) => {
    if (err) {
      res.send(err);
    }
    res.send(Agent_system);
  });
};
var _listAgent_system = (req, res) => {
  Agent_system.find((err, Agent_system) => {
    res.send(Agent_system);
  });
};

var _deleteAgent_system = (req, res) => {
  Agent_system.deleteOne({ _id: req.body.Agent_systemid.trim() }, function (
    err
  ) {
    if (err) {
      req.send(err);
    }
    res.send("1");
  });
};

var _editAgent_system = (req, res) => {
  Agent_system.findById(req.body.Agent_systemid.trim(), (err, Agent_system) => {
    Agent_system.Libelle = req.body.Libelle;
    Agent_system.Token = req.body.Token;
    Agent_system.Identifiant = req.body.Identifiant;
    Agent_system.Date_system = req.body.Date_system;
    Agent_system.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.send("1");
    });
  });
};

function authenticateToken(req, res, next) {
   
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    dotenv.config();
    if (token == null) return res.sendStatus(401)
  
    console.log(process.env.TOKEN_SECRET);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {res.sendStatus(403)}else{

            req.user = user
      
            next()
        }
   
  })
}



  function generateAccessToken(intitule) {


    dotenv.config();
  
    return jwt.sign(intitule, process.env.TOKEN_SECRET, { expiresIn: "3153600000s" });
  }
module.exports = {
  creatAgent_system: _creatAgent_system,
  listAgent_systembyid: _listAgent_systembyid,
  deleteAgent_system: _deleteAgent_system,
  listAgent_system: _listAgent_system,
  editAgent_system: _editAgent_system,
  authenticateToken:authenticateToken
};






