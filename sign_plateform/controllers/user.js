const {email} = require("../models/class_api_extern/email");
const { document } = require("../models/class_api_intern/document");
const {role }= require("../models/class_api_intern/role");
const { user } = require("../models/class_api_intern/user");

const { isNotEmpty, generateauthenticateToken, isObjectsuccess, verifierID,generatecode} = require("../models/function_intern/function");


const class_test = new user()
const class_role = new role()
const class_doc = new document()

var create_test = async(req,res)=>{

    if(isNotEmpty(req.body.Nom,req.body.Prenom,req.body.Email,req.body.Role

    ) ){
        // res.status(403).json({ message: 'Empty Token' })
      

       
              
             
        
                let data_email = await class_test.read({Email:req.body.Email})
              
               
                if(data_email.length!=0 ){
                    
                   
                    res.status(402).json({status:402, message: 'Email error' })
                }else{
                    let dt_role = true
                    await Promise.all(

                        req.body.TypeFile.map(async(elt)=>{
                            let dte_role = await class_role.read({_id:elt})
                            if(dte_role.lengh==0){
                                dt_role=false
                            }
                        })
                    );
                  
                    
                    if(dt_role){
                        
                   

                    let date = new Date()
                    let code = generatecode(6)
                    let pass_= generatecode(4)
                    let psss="@DPw"+pass_
                    let val = await class_test.create({
                        
                        Nom : req.body.Nom,
                        Prenom : req.body.Prenom,
                        Email : req.body.Email,
                        Role : req.body.Role,
                        Statut : "created",
                        Otp_code : code,
                        Password_hashed :psss ,
                        TypeFile:req.body.TypeFile,
                        TypeStruct:req.body.TypeStruct,
                        Date_creation : date,
                        Date_modification : date,
                        Datesystem : date,
            
            
            
            
            
                    })
                    //email de confirmation d'activation
                    const class_email = new email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",req.body.Email)
                    let new_link ="https://registrecarbone.ci.skyvisionafrica.com/myregister/active/"+val._id+"/"+code
                    let dat=await class_email._main("ask_account",new_link,psss)
                    console.log(dat)
                    isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' });
                
                }else{
                    res.status(401).json({status:401, message: 'Role Error' })
                }
                
                
                
                }
              
                    
                
            
          
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
    
   
}
var read_test = async(req,res)=>{

    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
        let val = await class_test.read(req.body)
     
      
        isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
    }else{
        if(req.body._id===undefined){
            let val = await class_test.read(req.body)
     
      
            isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
        }else{
            res.status(405).json({status:405, message: 'Error Id' })
        }
        
    }
}
var update_test = async(req,res)=>{
    if(isNotEmpty(req.body._id) && verifierID(req.body._id)){
       
    
        let val = await class_test.update(req.body._id,req.body)

        console.log(val)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
var delete_test = async(req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
    
        let val = await class_test.delete(req.body._id)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
var login = async (req,res)=>{
    if(isNotEmpty(req.body.Email,req.body.Password)){
        let data_email = await class_test.read({Email:req.body.Email,Password_hashed:req.body.Password})
        if(data_email.length==1 && data_email[0].Statut=="actif"){
            res.status(200).json({status:200, message: 'Success', data:data_email[0]})
        }else{
            res.status(401).json({status:401, message: 'Empty data' })
        }
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
// var active =async(req,res)=>{
//     if(isNotEmpty(req.body.Id,req.body.Code)){
//         let data_acc = await class_test.read({_id:req.body.Id,Otp_code:req.body.Code})
//         if(data_acc.length==1){
//             //email de confirmation d'activation
//             res.status(200).json({status:200, message: 'Success', data:[]})
//         }else{
//             res.status(401).json({status:401, message: 'Empty data' })
//         }
//     }else{
//         res.status(401).json({status:401, message: 'Empty data' })
//     }
// }

var active =async(req,res)=>{
    if(isNotEmpty(req.body.Id)){
        let data_acc = await class_test.read({_id:req.body.Id,Otp_code:req.body.Code})
        if(data_acc.length==1){
            //email de confirmation d'activation
           let val= class_test.update(req.body.Id,{Statut:"actif"})
           val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
          
        }else{
            res.status(401).json({status:401, message: 'Empty data' })
        }
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
var stat = async (req,res)=>{
    if(isNotEmpty(req.body.Id_user)){
        let data_acc = await class_test.read({_id:req.body.Id_user})
        if(data_acc.length==1){
            //email de confirmation d'activation*
         
            let documents =[]
            await Promise.all(data_acc[0].TypeFile.map(async elt=>{
                let dcs = await class_doc.read({Role:elt})
                if(dcs.length!=0){
                    documents= documents.concat(dcs)
                }
                
            }))
            let docus=[]
            await Promise.all(documents.map(async (elt,index)=>{
                let sign = await class_test.read({_id:elt.Id_user_sign})
                let myuser
                if(sign.length==1){
                    console.log("ook")
          
                    myuser=sign[0]
             
                }else{
                    myuser={
                        Nom:"introuvable",
                        Prenom:"introuvable"
                    }
                }
                docus.push({
                    doc:elt,
                    user:myuser
                })
            }))

            let sign ={
                attente:documents.filter(doc => doc.Status === "waiting").length,
                signe:documents.filter(doc => doc.Status === "accepted").length,
                refuse:documents.filter(doc => doc.Status === "denied").length,
                doc:docus
            }
            let mine ={
                signe:documents.filter(doc => (doc.Status === "accepted" && doc.Id_user_sign==req.body.Id_user)).length,
                refuse:documents.filter(doc => (doc.Status === "denied" && doc.Id_user_sign==req.body.Id_user)).length,
                doc:docus
            }

            let data ={global:sign,

                mine:mine
            }
            res.status(200).json({status:200, message: 'Success', data:data})
        }else{
            res.status(401).json({status:401, message: 'Empty data' })
        }
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
// mot de passe oublié , envoiyé un lien à l'email , au click renvoyer le nouvel code
module.exports={
    create_test:create_test,
    read_test:read_test,
    update_test:update_test,
    delete_test:delete_test,
    login:login,
    active:active,
    stat:stat
}