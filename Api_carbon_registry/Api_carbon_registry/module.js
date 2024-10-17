var fs = require("fs");

/*
const anArray = [{

        "as": "NomEntreprise"
    },
    {

        "as": "idPackEntreprise"
    },
    {

        "as": "LogoEntreprise"
    },
    {

        "as": "idPaysEntreprise"
    },
    {

        "as": "Addresse1Entreprise"
    },
    {

        "as": "Addresse2Entreprise"
    },
    {

        "as": "VilleEntreprise"
    },
    {

        "as": "CodePostalEntreprise"
    },
    {

        "as": "NumeroTvaEntreprise"
    },
    {

        "as": "IntraComunautaireEntreprise"
    },
    {

        "as": "idThemeEntreprise"
    },
    {

        "as": "AnneeCreationEntreprise"
    },


    {
        "as": "idTypeEtablissementEntreprise"
    },
    {

        "as": "idActivitePrincipaleEntreprise"
    },
    {

        "as": "idEffectifEntreprise"
    },
    {

        "as": "idChiffreAffaireEntreprise"
    },
    {

        "as": "idNbCommerciauxEntreprise"
    },
    {

        "as": "PourcentageChiffreAffaireExportEntreprise"
    },
    {

        "as": "SiteWebN1Entreprise"
    },
    {

        "as": "SiteWebN2Entreprise"
    },
    {

        "as": "ElementDeContactEntreprise"
    },
    {

        "as": "ImageEntreprise"
    },
    {

        "as": "VideoEntreprise"
    },
    {
        "as": "LangueParleeEntreprise"
    },
    {
        "as": "idZoneChalandise"
    },
    {
        "as": "idZoneExportation"
    },
    {
        "as": "idZoneImportation"
    },
    {
        "as": "idIncoterms"
    },
    {
        "as": "idModePaiement"
    },
    {
        "as": "Banque"
    },
    {
        "as": "Keyword"
    },
    {
        "as": "idConseil"
    },
    {
        "as": "TextDescriptionEntreprise"
    },
    {
        "as": "idProduit"
    },
    {
        "as": "idActualite"
    },

    {
        "as": "Photo_manager"
    },
    {
        "as": "Nom_manager"
    },
    {
        "as": "Prenom_manager"
    },
    {
        "as": "Fonction_manager"
    },
    {
        "as": "linkedln_manager"
    },
    {
        "as": "Email1_manager"
    },
    {
        "as": "Email2_manager"
    },
    {
        "as": "Email1_manager"
    },
    {
        "as": "contact_manager"
    },
    {
        "as": "Facebook_manager"
    },
    {
        "as": "Skype_manager"
    },

    {
        "as": "Photo_PointFocal"
    },
    {
        "as": "Nom_PointFocal"
    },
    {
        "as": "Prenom_PointFocal"
    },
    {
        "as": "Fonction_PointFocal"
    },
    {
        "as": "linkedln_PointFocal"
    },
    {
        "as": "Email1_PointFocal"
    },
    {
        "as": "Email2_PointFocal"
    },
    {
        "as": "Email1_PointFocal"
    },
    {
        "as": "contact_PointFocal"
    },
    {
        "as": "Facebook_PointFocal"
    },
    {
        "as": "Skype_PointFocal"
    },
];
*/
/*
const anArray = [

    {
        "as": "idTypePageProduit"
    },
    {
        "as": "linksitewebProduit"
    },
    {
        "as": "photoProduit"
    },
    {
        "as": "NomProduit"
    },
    {
        "as": "DescriptionProduit"
    },
    {
        "as": "ComplementTitreProduit"
    },
    {
        "as": "TypePageProduit"
    },


]
*/

/*
const anArray = [

    {
        "as": "NomUtilisateur"
    },
    {
        "as": "PrenomUtilisateur"
    },
    {
        "as": "EmailUtilisateur"
    },
    {
        "as": "MotdePasseUtilisateur"
    },
    {
        "as": "PosteUtilisateur"
    },

    {
        "as": "SalaireUtilisateur"
    },

    {
        "as": "NumeroTelUtilisateur"
    },

    {
        "as": "DateCreationUtilisateur"
    },
]

*/

/*
const anArray = [

    {
        "as": "NomPlanteur"
    },
    {
        "as": "PrenomPlanteur"
    },
    {
        "as": "ResidancePlanteur"
    },
    {
        "as": "NumeroTelPlanteur"
    },
    {
        "as": "IdGroupementPlanteur"
    },

    {
        "as": "DateCreationPlanteur"
    },

   
]

*/

/*
const anArray = [

    {
        "as": "LibelleGroupement"
    },
    {
        "as": "DateCreationGroupement"
    },
]
*/

/*
const anArray = [

    {
        "as": "LibelleVariete"
    },
    {
        "as": "PrixVariete"
    },

    {
        "as": "DateCreationVariete"
    },
]

*/

/*

const anArray = [

    {
        "as": "LibelleQualite"
    },
    {
        "as": "DateCreationQualite"
    },
]
*/

const anArray = [
  {
    as: "Ref_rapport_verification",
  },

  {
    as: "Fichier_rapport_verification",
  },
  {
    as: "Id_activte",
  },
  {
    as: "Id_certificateur_localal",
  },

  {
    as: "Matricule_certificateur_international",
  },

  {
    as: "Nom_certificateur_international",
  },
  {
    as: "Statut",
  },
  {
    as: "Date_system",
  },
];

function creatform(tablename, dbname, param1) {
  fs.mkdir("./controllers/" + tablename, function (err) {
    if (err) {
      console.log("Erreur de creation du dossier");
    } else {
      fs.appendFileSync(
        "./controllers/" + tablename + "/" + tablename + ".js",
        `

                               
                const ${tablename} = require("../models/${dbname}").${tablename};


                var _creat${tablename} = (req, res) => {

                    ${tablename} = new ${tablename}();


                    ${anArray.reduce(
                      (updated, latest) =>
                        updated.concat(
                          `${tablename}.${latest.as}=req.body.${latest.as};\n`
                        ),
                      ""
                    )}

                  
        
                    ${tablename}.save(function(err) {
        
        
                        if (err) {
        
                            res.send(err);
                        }
        
                        res.send("1");
        
                    })

                
                }
                
                var _list${tablename}byid = (req, res) => {

                    ${tablename}.findByid(req.body.${tablename}id.trim(), (err, ${tablename}) => {


                        if (err) {
                
                            res.send(err);
                
                        }
                        res.send(${tablename});
                                
                    })


                
                }
                var _list${tablename} = (req, res) => {
                

                    ${tablename}.find((err, ${tablename}) => {

                        res.send(${tablename});
                    })



                }
                
                var _delete${tablename} = (req, res) => {
                

                    ${tablename}.deleteOne({ _id: req.body.${tablename}id.trim() }, function(err) {
                        if (err) {
                            req.send(err);
                        }
                        res.send('1');
                
                    })

                }
                
                var _edit${tablename} = (req, res) => {
                
                    ${tablename}.findByid(req.body.${tablename}id.trim(), (err, ${tablename}) => {

                        ${anArray.reduce(
                          (updated, latest) =>
                            updated.concat(
                              `${tablename}.${latest.as}=req.body.${latest.as};\n`
                            ),
                          ""
                        )}
                
                        ${tablename}.save(function(err) {
                
                
                            if (err) {
                
                                res.send(err);
                            }
                
                            res.send("1");
                
                        })
                
                
                
                    })

                }



                module.exports = {
                    creat${tablename}: creat${tablename},
                    list${tablename}byid: list${tablename}byid,
                    delete${tablename}: delete${tablename},
                    list${tablename}: list${tablename},
                    edit${tablename}: edit${tablename},
                   
                }

                `
      );

      // Creation de la table en db

      fs.appendFileSync(
        "./models/" + dbname + ".js",
        `
            var ${tablename} = mongoose.Schema({
               
                ${anArray.reduce(
                  (updated, latest) =>
                    updated.concat(`${latest.as}:String,\n `),
                  ""
                )}
            });

            `
      );

      fs.appendFileSync(
        "./routes/" + "users.js",
        `
                router.post('/apiv1/creat${tablename}', controller.creat${tablename});

                router.post('/apiv1/list${tablename}byid', controller.list${tablename}byid);
    
                router.post('/apiv1/delete${tablename}', controller.delete${tablename});
    
                router.post('/apiv1/list${tablename}', controller.list${tablename});
    

                router.post('/apiv1/edit${tablename}', controller.edit${tablename});

            `
      );
    }
  });
}

creatform("Rapport_verification", "CARBON_REGISTRY");
