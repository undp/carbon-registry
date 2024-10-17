
const fs = require('fs-extra')
const { generateliigiToken,isNotEmpty,check_admin, isObjectsuccess,verifierID, authenticateliigiToken } = require("../models/function")
const _default = require('../setting/default')
const path = require('path');
const FormData = require('form-data');
const class_email = require('../models/email').email;
const api = require("../models/api_central").api
const doc_api = require("../models/api_central").doc_api
let doc_apis=new doc_api()
let apis = new api()

var register = async (req,res)=>{
    console.log(req.body)
    try {
        const form1 = new FormData();
        const form2 = new FormData();
        const form3 = new FormData();
       
        req.files['logo'].forEach(async file => {
          
            form1.append('Logo_organisation', fs.createReadStream(file.path));
            console.log("okV1")
        });
        if( req.files['fiscal']){
            console.log(req.files['fiscal'])
            req.files['fiscal'].forEach(async file => {
          
                form1.append('DFE', fs.createReadStream(file.path));
                console.log("okV2")
            });
        }
      
        req.files['registre'].forEach(async file => {
          
            form1.append('RCCM', fs.createReadStream(file.path));
            console.log("okV3")
        });

        form1.append('Denomination_organisation', req.body.Denomination_organisation);
        form1.append('Site_web_organisation', req.body.Site_web_organisation);
        form1.append('Email_organisation', req.body.Email_organisation);
        form1.append('Numero_tel_organisation', req.body.Numero_tel_organisation);
        form1.append('Numero_tel_admin_organisation', req.body.Numero_tel_organisation);
        form1.append('Email_admin_organisation', req.body.Email_organisation);
   
        console.log("ok2")
        let data1 = await apis.create_organisation(form1)
        console.log(data1)
        console.log("ok3")
        if(isNotEmpty(data1.Reference_organisation)){
            // form2.append('numero_transaction', req.body.numero_transaction);
            // form2.append('Id_type_paiement', _default.eligi_type_pay);
            // form2.append('Methode_paiement', req.body.Methode_paiement);
            // form2.append('Id_Organisation', data1.Reference_organisation);
            console.log("ok4")
            // req.files['justif'].forEach(async file => {
          
            //     form2.append('Piece_justificative', fs.createReadStream(file.path));
            // });
            //     let data2 = await apis.create_paiement(form2)
            //     console.log(data2)
                // if(isNotEmpty(data2.Ref_paiement)){
                    form3.append('Id_organisation', data1.Reference_organisation);
                    // form3.append('Idpayement', data2.Ref_paiement);
                    console.log("ok5")
                    req.files['note'].forEach(async file => {
          
                        form3.append('Note_idee', fs.createReadStream(file.path));
                    });
                    req.files['conformite'].forEach(async file => {
          
                        form3.append('Document_conformite', fs.createReadStream(file.path));
                    });
                    let data3 = await apis.create_note(form3)
                    console.log(data3)
                    if(isNotEmpty(data3.Ref_note_idee)){
                        res.json({status:200});
                    }
                // }
                
        }else{
            res.json({status:400});
        }
     

        // req.files.forEach(file => {
        //     form.append('files', fs.createReadStream("./tempfiles/"+file.filename));
        // });
        //  // Supprimer le fichier temporaire après l'envoi
        //  console.log( form)
        check =true
        if(check){

            req.files['logo'].forEach(async file => {
                if (fs.existsSync(file.path)) {
                    // Supprime le fichier
                fs.remove("./tempfiles/"+file.filename, async err => {
                        if (err) {
                            console.error('Error deleting temp file:', err);
                        } 
                    });
                }
               
            });
             
            req.files['fiscal'].forEach(async file => {
                if (fs.existsSync(file.path)) {
                    // Supprime le fichier
                fs.remove("./tempfiles/"+file.filename, async err => {
                        if (err) {
                            console.error('Error deleting temp file:', err);
                        } 
                    });
                }
               
            });
             
            req.files['registre'].forEach(async file => {
                if (fs.existsSync(file.path)) {
                    // Supprime le fichier
                fs.remove("./tempfiles/"+file.filename, async err => {
                        if (err) {
                            console.error('Error deleting temp file:', err);
                        } 
                    });
                }
               
            });
             
            req.files['note'].forEach(async file => {
                if (fs.existsSync(file.path)) {
                    // Supprime le fichier
                fs.remove("./tempfiles/"+file.filename, async err => {
                        if (err) {
                            console.error('Error deleting temp file:', err);
                        } 
                    });
                }
               
            });
             
            req.files['conformite'].forEach(async file => {
                if (fs.existsSync(file.path)) {
                    // Supprime le fichier
                fs.remove("./tempfiles/"+file.filename, async err => {
                        if (err) {
                            console.error('Error deleting temp file:', err);
                        } 
                    });
                }
               
            });
             
            req.files['justif'].forEach(async file => {
                if (fs.existsSync(file.path)) {
                    // Supprime le fichier
                fs.remove("./tempfiles/"+file.filename, async err => {
                        if (err) {
                            console.error('Error deleting temp file:', err);
                        } 
                    });
                }
               
            });

        }
       
        
        // res.json({status:200});
    } catch(error){
        
        req.files['logo'].forEach(async file => {
            if (fs.existsSync(file.path)) {
                // Supprime le fichier
            fs.remove("./tempfiles/"+file.filename, async err => {
                    if (err) {
                        console.error('Error deleting temp file:', err);
                    } 
                });
            }
           
        });
        if( req.files['fiscal']){
        req.files['fiscal'].forEach(async file => {
            if (fs.existsSync(file.path)) {
                // Supprime le fichier
            fs.remove("./tempfiles/"+file.filename, async err => {
                    if (err) {
                        console.error('Error deleting temp file:', err);
                    } 
                });
            }
           
        });}
         
        req.files['registre'].forEach(async file => {
            if (fs.existsSync(file.path)) {
                // Supprime le fichier
            fs.remove("./tempfiles/"+file.filename, async err => {
                    if (err) {
                        console.error('Error deleting temp file:', err);
                    } 
                });
            }
           
        });
         
        req.files['note'].forEach(async file => {
            if (fs.existsSync(file.path)) {
                // Supprime le fichier
            fs.remove("./tempfiles/"+file.filename, async err => {
                    if (err) {
                        console.error('Error deleting temp file:', err);
                    } 
                });
            }
           
        });
         
        req.files['conformite'].forEach(async file => {
            if (fs.existsSync(file.path)) {
                // Supprime le fichier
            fs.remove("./tempfiles/"+file.filename, async err => {
                    if (err) {
                        console.error('Error deleting temp file:', err);
                    } 
                });
            }
           
        });
         
        // req.files['justif'].forEach(async file => {
        //     if (fs.existsSync(file.path)) {
        //         // Supprime le fichier
        //     fs.remove("./tempfiles/"+file.filename, async err => {
        //             if (err) {
        //                 console.error('Error deleting temp file:', err);
        //             } 
        //         });
        //     }
           
        // });

       
    }
}
var login = async (req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body.password,req.body.email)){
       
         data= await apis.auth_user(req.body.email,req.body.password)
      
            if(data.length===1){
              console.log( data[0]) 
                let token =generateliigiToken ({user:data[0].Ref_organisation})
                req.session.eligi_token = token
              
                res.status(200).json({status:200, message: 'Success' ,token:token})

            }else{
                res.status(200).json({status:407, message: 'Error data' })
            }
           
            
           

    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}
var verify = async (req,res)=>{
    if(isNotEmpty(req.body.idcr)){
        let data = await doc_apis._read({Immat:"IDRC"+req.body.idcr})
        console.log(data)
      
        res.json(data)
    }else{
        res.json({status:402,message:"Error Data"})
    }
}
var add_note = async (req,res)=>{
    const form3 = new FormData();
 console.log(req.body.Reference_organisation)
    form3.append('Id_organisation', req.body.Reference_organisation);
    if( req.files['note']){
        req.files['note'].forEach(async file => {
          
            form3.append('Note_idee', fs.createReadStream(file.path));
        });
    }
    if( req.files['conformite']){
        req.files['conformite'].forEach(async file => {

            form3.append('Document_conformite', fs.createReadStream(file.path));
        });
    }

    let data = await apis.create_note(form3)
                  
                     if(isNotEmpty(data.Ref_note_idee)){
                        res.json({status:200});}else{
                            res.json({status:400})
                        }
}
var update_note =async(req,res)=>{
    console.log(req.body)
    const form3 = new FormData();
    form3.append('Note_ideeid', req.body._id);
    if( req.files['note']){
        req.files['note'].forEach(async file => {
          
            form3.append('Note_idee', fs.createReadStream(file.path));
        });
    }
    if( req.files['conformite']){
        req.files['conformite'].forEach(async file => {

            form3.append('Document_conformite', fs.createReadStream(file.path));
        });
    }

    let data = await apis.update_note(form3)
                  console.log(data)
                     if(data==1){
                        res.json({status:200});
                    }else{
                        res.json({status:400});
                    }
   
}

var update_note_recours =async(req,res)=>{
    const form3 = new FormData();
    form3.append('Note_ideeid', req.body._id);
    form3.append('Commentaire_recours', req.body.commentaire);
    form3.append('Statut', "recours");
    // let form3 ={
    //     Note_ideeid:req.body._id,
    //     Commentaire_recours:req.body.commentaire,
    //     Status:'recours'
    // }
    let data = await apis.update_note(form3)
                  
    if(data==1){
        res.json({status:200});
    }else{
        res.json({status:400});
    }
}

var update_orga =async(req,res)=>{

    const form1 = new FormData();
    console.log(req.body)
    if( req.files['logo']){
        console.log("okV1")
    req.files['logo'].forEach(async file => {
          
        form1.append('Logo_organisation', fs.createReadStream(file.path));
       
    })}
    if( req.files['fiscal']){
        console.log(req.files['fiscal'])
        req.files['fiscal'].forEach(async file => {
      
            form1.append('DFE', fs.createReadStream(file.path));
           
        });
    }
    if( req.files['registre']){
        console.log("okV3")
    req.files['registre'].forEach(async file => {
      
        form1.append('RCCM', fs.createReadStream(file.path));
       
    });
    }
        form1.append('Organisationid', req.body._id);
        form1.append('Denomination_organisation', req.body.Denomination_organisation);
        form1.append('Site_web_organisation', req.body.Site_web_organisation);
        form1.append('Numero_tel_organisation', req.body.Numero_tel_organisation);
        form1.append('Numero_tel_admin_organisation', req.body.Numero_tel_organisation);


        let data = await apis.update_orga(form1)
                  
        if(data==1){
            res.json({status:200});
        }else{
            res.json({status:400});
        }

}

var update_orga_pass = async(req,res)=>{
    let data = await apis.update_orga_pass(req.body.email)
                  
    if(data==1){
        res.json({status:200});
    }else{
        res.json({status:400});
    }
}


var send_message = async (req,res)=>{
    if(isNotEmpty(req.body.name,req.body.sujet,req.body.message,req.body.email)){
        
        let c_email = new class_email(_default.contact_sender.title,_default.contact_sender.sender)
        let go = await c_email._main("new_message",{
            nomprenom:req.body.name,
            email:req.body.email,
            sujet:req.body.sujet,
            message:req.body.message
        })

        let c_email_c = new class_email(_default.contact_sender.title,req.body.email)
        let go_c = await c_email_c._main("user_message",{
            nomprenom:req.body.name,
            email:req.body.email,
            sujet:req.body.sujet,
            message:req.body.message
        })
  
        if(go.status && go.message.status== '1' ){
            res.json({status:200,message:"success"})
        }else{
            res.json({status:400,message:"data error"})
        }
    }else{
        res.json({status:400,message:"data error"})
    }
    
  
}
module.exports = {
    
    
    add_note:add_note,
    update_note:update_note,
    update_orga:update_orga,
    login:login,
    register:register,
    update_note_recours:update_note_recours,
    verify:verify,
    update_orga_pass:update_orga_pass,
    send_message:send_message

    
}