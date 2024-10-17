

                               
                const Secteur = require("../models/CARBON_REGISTRY").Secteur;


                var _creatSecteur = (req, res) => {

                    Secteur = new Secteur();


                    Secteur.ref_secteur=req.body.ref_secteur;
Secteur.libelle_sous_secteur=req.body.libelle_sous_secteur;

Secteur.Date_system=req.body.Date_system;


                  
        
                    Secteur.save(function(err) {
        
        
                        if (err) {
        
                            res.send(err);
                        }
        
                        res.send("1");
        
                    })

                
                }
                
                var _listSecteurbyid = (req, res) => {

                    Secteur.findByid(req.body.Secteurid.trim(), (err, Secteur) => {


                        if (err) {
                
                            res.send(err);
                
                        }
                        res.send(Secteur);
                                
                    })


                
                }
                var _listSecteur = (req, res) => {
                

                    Secteur.find((err, Secteur) => {

                        res.send(Secteur);
                    })



                }
                
                var _deleteSecteur = (req, res) => {
                

                    Secteur.deleteOne({ _id: req.body.Secteurid.trim() }, function(err) {
                        if (err) {
                            req.send(err);
                        }
                        res.send('1');
                
                    })

                }
                
                var _editSecteur = (req, res) => {
                
                    Secteur.findByid(req.body.Secteurid.trim(), (err, Secteur) => {

                        Secteur.ref_secteur=req.body.ref_secteur;
Secteur.libelle_sous_secteur=req.body.libelle_sous_secteur;

Secteur.Date_system=req.body.Date_system;

                
                        Secteur.save(function(err) {
                
                
                            if (err) {
                
                                res.send(err);
                            }
                
                            res.send("1");
                
                        })
                
                
                
                    })

                }



                module.exports = {
                    creatSecteur: creatSecteur,
                    listSecteurbyid: listSecteurbyid,
                    deleteSecteur: deleteSecteur,
                    listSecteur: listSecteur,
                    editSecteur: editSecteur,
                   
                }

                