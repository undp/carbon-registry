

                               
                const Rapport_verification = require("../models/CARBON_REGISTRY").Rapport_verification;


                var _creatRapport_verification = (req, res) => {

                    Rapport_verification = new Rapport_verification();


                    Rapport_verification.Ref_rapport_verification=req.body.Ref_rapport_verification;
Rapport_verification.Fichier_rapport_verification=req.body.Fichier_rapport_verification;
Rapport_verification.Id_activte=req.body.Id_activte;
Rapport_verification.Id_certificateur_localal=req.body.Id_certificateur_localal;
Rapport_verification.Matricule_certificateur_international=req.body.Matricule_certificateur_international;
Rapport_verification.Nom_certificateur_international=req.body.Nom_certificateur_international;
Rapport_verification.Statut=req.body.Statut;
Rapport_verification.Date_system=req.body.Date_system;


                  
        
                    Rapport_verification.save(function(err) {
        
        
                        if (err) {
        
                            res.send(err);
                        }
        
                        res.send("1");
        
                    })

                
                }
                
                var _listRapport_verificationbyid = (req, res) => {

                    Rapport_verification.findByid(req.body.Rapport_verificationid.trim(), (err, Rapport_verification) => {


                        if (err) {
                
                            res.send(err);
                
                        }
                        res.send(Rapport_verification);
                                
                    })


                
                }
                var _listRapport_verification = (req, res) => {
                

                    Rapport_verification.find((err, Rapport_verification) => {

                        res.send(Rapport_verification);
                    })



                }
                
                var _deleteRapport_verification = (req, res) => {
                

                    Rapport_verification.deleteOne({ _id: req.body.Rapport_verificationid.trim() }, function(err) {
                        if (err) {
                            req.send(err);
                        }
                        res.send('1');
                
                    })

                }
                
                var _editRapport_verification = (req, res) => {
                
                    Rapport_verification.findByid(req.body.Rapport_verificationid.trim(), (err, Rapport_verification) => {

                        Rapport_verification.Ref_rapport_verification=req.body.Ref_rapport_verification;
Rapport_verification.Fichier_rapport_verification=req.body.Fichier_rapport_verification;
Rapport_verification.Id_activte=req.body.Id_activte;
Rapport_verification.Id_certificateur_localal=req.body.Id_certificateur_localal;
Rapport_verification.Matricule_certificateur_international=req.body.Matricule_certificateur_international;
Rapport_verification.Nom_certificateur_international=req.body.Nom_certificateur_international;
Rapport_verification.Statut=req.body.Statut;
Rapport_verification.Date_system=req.body.Date_system;

                
                        Rapport_verification.save(function(err) {
                
                
                            if (err) {
                
                                res.send(err);
                            }
                
                            res.send("1");
                
                        })
                
                
                
                    })

                }



                module.exports = {
                    creatRapport_verification: creatRapport_verification,
                    listRapport_verificationbyid: listRapport_verificationbyid,
                    deleteRapport_verification: deleteRapport_verification,
                    listRapport_verification: listRapport_verification,
                    editRapport_verification: editRapport_verification,
                   
                }

                