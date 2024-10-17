const api = require("../models/class_api_extern/api").api;
const class_email = require("../models/class_api_extern/email").email;
const {email} = require("../models/class_api_extern/email");
const { document} = require("../models/class_api_intern/document");
const {role} = require("../models/class_api_intern/role");
const {role_type_doc} = require("../models/class_api_intern/role_type_doc");
const {type_doc }= require("../models/class_api_intern/type_doc");
const {user} = require("../models/class_api_intern/user");

const { isNotEmpty,generate_global_code, generateauthenticateToken, isObjectsuccess, verifierID, generateLetter_autorisation, generateLetter_objection, generateLetter_eligibilite, generateLetter_approbation, generateLetter_approbation_eng, generate_identify_code, generateLetter_approbation_sign, generateLetter_approbation_eng_sign, generateLetter_objection_eng_sign, generateLetter_objection_sign, generateLetter_eligibilite_eng_sign, generateLetter_eligibilite_sign, generatecode,generateLetter_autorisation_eng_sign,generateLetter_autorisation_sign } = require("../models/function_intern/function");
const { api_origin } = require("../settings/default");
const FormData = require('form-data');
const class_test = new document()

const class_role = new role()
const class_user = new user()
const apis = new api()
var create_projet_test = async(req,res)=>{

    if(isNotEmpty(req.body.IdProjet,req.body.Type

    ) ){
    //     Intitule: String,
    // Type: String,
    // Otp_code: String,
    // Numero_de_validation: String,
    // Url:String,
    // upload_link:String,
    // Datesystem: String,
    let Intitule = ""
    let save = false
    let URL =""
    let token = await apis.auth_register()

    let d_role = await class_role.read({ Intitule_role: req.body.Type });
    let role = (d_role.length == 1) ? d_role[0]._id : "";
    console.log(token.access_token)
        if(isNotEmpty(token.access_token)){
            let orgas_name=""
            let projet = await apis.single_projet(req.body.IdProjet,token.access_token)
            let organisation = projet.list.data[0].company
            let projet_data= projet.list.data[0]

            console.log(organisation)
            organisation.map(elt=>{
                if(orgas_name===""){
                    orgas_name = elt.name
                }else{
                    orgas_name = orgas_name+" , " +elt.name
                }
               
            })
           
            console.log(projet.list.data)
            let data = {
                programmeId:req.body.IdProjet, programmeName:projet_data.title, authorisedCompanyName:"Bureau du marché carbone", orgName:orgas_name, designDocUrl:"https://skyvisionafrica.com", methodologyDocUrl:"https://skyvisionafrica.com",
                created:projet_data.createdAt
              
            }
            
            switch (req.body.Lang) {
                case 'eng':
                    data.authorisedCompanyName="Office of carbon market"
                    break;
            
                default:
                    data.authorisedCompanyName="Bureau du marché carbone"
                    break;
            }
            let doc_code = await generate_global_code(req.body.Type)
            switch (req.body.Type) {
                
               
                 case "approbation_letter":
                  
                    if(req.body.Lang=="eng"){
                        Intitule="Approbation Letter"
                        save= true
                        URL=  await generateLetter_approbation_eng(data.programmeId,data.programmeName,data.authorisedCompanyName,data.orgName,data.created,doc_code.random,doc_code.otp)
                    }else{
                     Intitule="Lettre d'approbation"
                     //id pro
                     save= true
                  URL=  await generateLetter_approbation(data.programmeId,data.programmeName,data.authorisedCompanyName,data.orgName,data.created,doc_code.random,doc_code.otp)
                    }
                     break;
                 case "autorisation_letter":
                     save = true
                     if(req.body.Lang=="eng"){
                        Intitule="Autorization Letter"
                        //id pro
                           URL = await generateLetter_autorisation_eng(doc_code.otp,"ministère de l'environ","M", data.programmeId, data.programmeName, data.authorisedCompanyName, data.orgName, data.designDocUrl, data.methodologyDocUrl,doc_code.random)
                     }else{
                        Intitule="Lettre d'autorisation"
                        //id pro
                           URL = await generateLetter_autorisation(doc_code.otp,"ministère de l'environ","M",data.programmeId, data.programmeName, data.authorisedCompanyName, data.orgName, data.designDocUrl, data.methodologyDocUrl,doc_code.random)
                     }
                    
                     break;
                
             }
                    
                 
                        
                         // res.status(403).json({ message: 'Empty Token' })
                       //creer un document
                            
                       if(save){
                       let date = new Date()
                
                         let val = await class_test.create({
                             
                             Intitule: Intitule,
                             IdProjet: req.body.IdProjet,
                             TypeFile:"Project_doc",
                             Type:req.body.Type,
                             Otp_code: doc_code.otp,
                             Numero_de_validation: doc_code.code,
                             Immat:doc_code.random,
                             upload_link:"",
                             Status:"waiting",
                             Url:URL,
                             Role:role,
                             Signed:false,
                             Date_creation : date,
                             Date_modification : date,
                             Datesystem : date,
                 
                 
                 
                 
                 
                 
                         })

                         //Email role #newemail
                         let user_email=""
                         let dd_role = await class_role.read({Intitule:req.body.Type})
                         if(dd_role==1){
                            dd_user = await class_user.read({})
                            dd_user.map(elt=>{
                                
                                    if (elt.TypeFile.includes(dd_role[0]._id)) {
                                        if(user_email=""){
                                            user_email=elt.Email
                                        }else{
                                            user_email=user_email+','+elt.Email
                                        }
                                        
                                    }
                                
                            })
                         }
                         let myemail= new class_email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",user_email)
                         let dat=await myemail._main("ask_sign","","")
                         // res.status(402).json({ message: 'Error Token' })
                        
                         isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
                 
                     }else{
                         res.status(401).json({status:401, message: 'Type error' })
                     }
              
               
                
        }else{
            res.status(401).json({status:401, message: 'Error System' })
        }
    
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
    
   
}
var create_idea_test = async(req,res)=>{

    if(isNotEmpty(req.body.IdIdea,req.body.Type

    ) ){
    //     Intitule: String,
    // Type: String,
    // Otp_code: String,
    // Numero_de_validation: String,
    // Url:String,
    // upload_link:String,
    // Datesystem: String,
    let Intitule = ""
    let save = false
    let URL =""

    let d_role = await class_role.read({ Intitule_role: req.body.Type });
    let role = (d_role.length == 1) ? d_role[0]._id : "";
    let token = await apis.auth_register()
    console.log(token.access_token)
        if(isNotEmpty(token.access_token)){
            let orgas_name=[]
          
            let projet = await apis.idea_get_idea(req.body.IdIdea)
            if(projet.length!=0){
            let orga = await apis.idea_get_organisation(projet[0].Id_organisation)
            console.log(projet)
            console.log(orga)
            orgas_name.push(orga[0].Denomination_organisation)
         
            let projet_data= projet[0]
           
           
            
            let data = {
                programmeId:req.body.IdIdea, programmeName:projet_data.Ref_note_idee, authorisedCompanyName:"Bureau du marché carbone", orgName:orgas_name, designDocUrl:"https://skyvisionafrica.com", methodologyDocUrl:"https://skyvisionafrica.com"
               }

               let doc_code = await generate_global_code(req.body.Type)

           
            switch (req.body.Type) {
              
                 case "objection_letter":
                     Intitule="Lettre d'objection"
                     //id idea
                    
                     save=true
                     if(req.body.Lang=="eng"){
                        Intitule="NO OBJECTION LETTER"
                        //id pro
                        URL = await  generateLetter_objection_en(doc_code.otp,"Minister of environement","Test",orgas_name,data.programmeName,data.programmeId,doc_code.random)
                     }else{
                        Intitule="Lettre de non objectif"
                        //id pro
                        URL = await  generateLetter_objection(doc_code.otp,"Ministère de l'environnement","Test",orgas_name,data.programmeName,data.programmeId,doc_code.random)
                     }
                     break;
           
                 case "eligibilite_letter":
                     Intitule="Lettre d'eligibilite"
                     save=true
                     if(req.body.Lang=="eng"){
                        URL=await generateLetter_eligibilite_eng(doc_code.otp,data.programmeId,data.programmeName,"Energy",'Orgname',"orgadress","MaY","2024",doc_code.random)
                     }else{
                        URL=await generateLetter_eligibilite(doc_code.otp,data.programmeId,data.programmeName,"Energy",'Orgname',"orgadress","MaY","2024",doc_code.random)
                     }
                     //id idea
                   
                     break;
                
                
             }
                    
                 
                        
                         // res.status(403).json({ message: 'Empty Token' })
                       //creer un document
                            
                       if(save){
                       let date = new Date()
                         let val = await class_test.create({
                             
                             Intitule: Intitule,
                             IdProjet: req.body.IdIdea,
                             TypeFile:"Idea_doc",
                             Otp_code: doc_code.otp,
                             Numero_de_validation: doc_code.code,
                             Immat:doc_code.random,
                             Type:req.body.Type,
                             upload_link:"",
                             Url:URL,
                             Role:role,
                             Status:"waiting",
                             Signed:false,
                             Date_creation : date,
                             Date_modification : date,
                             Datesystem : date,
                 
                 
                 
                 
                 
                 
                         })
                         // res.status(402).json({ message: 'Error Token' })
                         //email role #newemail
                         let user_email=""
                         let dd_role = await class_role.read({Intitule:req.body.Type})
                         if(dd_role==1){
                            dd_user = await class_user.read({})
                            dd_user.map(elt=>{
                                
                                    if (elt.TypeFile.includes(dd_role[0]._id)) {
                                        if(user_email=""){
                                            user_email=elt.Email
                                        }else{
                                            user_email=user_email+','+elt.Email
                                        }
                                        
                                    }
                                
                            })
                         }
                         let myemail= new class_email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",user_email)
                         let dat=await myemail._main("ask_sign","","")
                         isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
                 
                     }else{
                         res.status(401).json({status:401, message: 'Type error' })
                     }
              
                    }else{
                        res.status(401).json({status:401, message: 'Error Note' })
                    }
                
        }else{
            res.status(401).json({status:401, message: 'Error System' })
        }
    
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
    
   
}
var read_test = async(req,res)=>{
console.log(req.body)
    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
        let val = await class_test.read({_id:req.body._id})
     
      
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
var read_global = async(req,res)=>{

    if(isNotEmpty(req.body.Id) &&  isNotEmpty(req.body.Type)){
        let val={
         
        }
        
        switch (req.body.Type) {
            case "Note":
                //objection_letter

                let obj = await class_test.read({IdProjet:req.body.Id,Type:"objection_letter"});
           
                if(obj.length!=0 ){
                    (obj[0].Signed)?val.objection_letter={exist:true,signed:obj[0].Signed,link:obj[0].upload_link}:val.objection_letter={exist:true,signed:obj[0].Signed,link:obj[0].Url};
                }else{
                    val.objection_letter={exist:false}
                }
               
               
                //eligibilite_letter
                let eli = await class_test.read({IdProjet:req.body.Id,Type:"eligibilite_letter"})
                if(eli.length!=0){
                   
                    (eli[0].Signed)?val.eligibilite_letter={exist:true,signed:eli[0].Signed,link:eli[0].upload_link}:val.eligibilite_letter={exist:true,signed:eli[0].Signed,link:eli[0].Url};
                }else{
                    val.eligibilite_letter={exist:false}
                }
                
                break;
            case "Projet":
                //approbation_letter
                let app = await class_test.read({IdProjet:req.body.Id,Type:"approbation_letter"})
                if(app.length!=0){
                  
                    (app[0].Signed)?val.approbation_letter={exist:true,signed:app[0].Signed,link:app[0].upload_link}:val.approbation_letter={exist:true,signed:app[0].Signed,link:app[0].Url};
                }else{
                    val.approbation_letter={exist:false}
                }
                
                //autorisation_letter
                let auto = await class_test.read({IdProjet:req.body.Id,Type:"autorisation_letter"})
                if(auto.length!=0){
                  
                    (auto[0].Signed)?val.autorisation_letter={exist:true,signed:auto[0].Signed,link:auto[0].upload_link}:val.autorisation_letter={exist:true,signed:auto[0].Signed,link:auto[0].Url};
                }else{
                    val.autorisation_letter={exist:false}
                }
                
                break;
        }
       
     
      
        isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
    }else{
       
            res.status(405).json({status:405, message: 'Error Data' })
       
        
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
var add_doc_sign= async (req,res)=>{
    //verifier le type, l'id du proogramme. Verifier qu'un notre n'a pas été signé
   
    if(isNotEmpty(req.body.Type,req.body.Id_pro_idea)){
        console.log(req.body)
        let data = await class_test.read({IdProjet:req.body.Id_pro_idea,Type:req.body.Type})
        console.log(data)
        if(data.length!=0){
            let link =req.file.filename
            let next=false
            let user_email=""
            switch (req.body.Type) {
                //note
                case "objection_letter":
                case "eligibilite_letter": 
                    let projet = await apis.idea_get_idea(req.body.Id_pro_idea)
                        if(projet.length!=0){
                        let orga = await apis.idea_get_organisation(projet[0].Id_organisation)
                        console.log(orga)
                        user_email = orga[0].Email_organisation
                        next=true
                        }
                    
                    break;
                //projet
                case "approbation_letter":
                case "autorisation_letter":
                    let token = await apis.auth_register()
                    if(isNotEmpty(token.access_token)){
                        let projet = await apis.single_projet(req.body.Id_pro_idea,token.access_token)
                        let organisation = projet.list.data[0].company;
                        organisation.map(elt=>{
                            if(user_email===""){
                                user_email = elt.email
                            }else{
                                user_email = user_email+" , " +elt.email
                            }
                           
                        })
                        next=true  
                    }
                
                    break;
    
            }

            if(next){
            console.log(data[0])
            let new_link=api_origin+"/"+link
            let val = await class_test.update(data[0]._id,{upload_link:new_link,Url:new_link,Signed:true,Status:"accepted"})
            let myemail= new class_email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",user_email)
            let dat=await myemail._main(req.body.Type,new_link,"")
            console.log(dat)
            //#newemail
            if(val && (req.body.Type=="objection_letter" ||req.body.Type=="eligibilite_letter")){
                const form3 = new FormData();
                                    form3.append('Note_ideeid',orga[0]._id);
                                    
                                    form3.append('Statut', "valide");
                                    let data = await apis.idea_update(form3)
            }
            if(val && (req.body.Type=="autorisation_letter")){
                let tokens = await apis.auth_register()
                let projet = await apis.autorise_itmo(req.body.Id_pro_idea,tokens.access_token)
                console.log(projet)
            }
            //envoyer un email
           val?res.status(200).json({status:200, message: 'Success',data:{link:new_link} }):res.status(404).json({status:404, message: 'Error system DB' })
            }else{
                res.status(404).json({status:404, message: 'Error ID' })
            }
        }else{
            res.status(404).json({status:404, message: 'Error system DATA' })
        }

        
    }else{
        res.status(404).json({status:404, message: 'Empty Data' })
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
var sign_auto=async(req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body._id,req.body.Id_user,req.body.Status,req.body.Auth_code) && verifierID(req.body._id)){
       let val = await class_test.read({_id:req.body._id,Auth_code:req.body.Auth_code})
       if(val.length===1){
            let lang='fr'
            let signature=""
           
            console.log(val)
            val=val[0]
            let Intitule = ""
            let save = false
            let URL =""
            let user_email=""
            if(req.body.Status==="accepted"){
                console.log(req.file)
                let new_data ={
                    signature:req.file.path
                }
            let token = await apis.auth_register()
                switch (val.TypeFile) {

                case "Project_doc":
                
                        if(isNotEmpty(token.access_token)){
                            let orgas_name=""
                            let projet = await apis.single_projet(val.IdProjet,token.access_token)
                            let organisation = projet.list.data[0].company
                            let projet_data= projet.list.data[0]
                
                            console.log(organisation)
                            organisation.map(elt=>{
                                if(orgas_name===""){
                                    orgas_name = elt.name
                                }else{
                                    orgas_name = orgas_name+" , " +elt.name
                                }
                                if(user_email===""){
                                    user_email = elt.email
                                }else{
                                    user_email = user_email+" , " +elt.email
                                }
                            })
                        
                            console.log(projet.list.data)
                            let data = {
                                programmeId:val.IdProjet, programmeName:projet_data.title, authorisedCompanyName:"Bureau du marché carbone", orgName:orgas_name, designDocUrl:"https://skyvisionafrica.com", methodologyDocUrl:"https://skyvisionafrica.com",
                                created:projet_data.createdAt
                            
                            }
                            
                            switch (lang) {
                                case 'eng':
                                    data.authorisedCompanyName="Office of carbon market"
                                    break;
                            
                                default:
                                    data.authorisedCompanyName="Bureau du marché carbone"
                                    break;
                            }
                            let doc_code = {otp:val.Otp_code,random:val.Immat}
                            switch (val.Type) {
                                
                            
                                case "approbation_letter":
                                
                                    if(lang=="eng"){
                                        Intitule="Approbation Letter"
                                        save= true
                                        URL=  await generateLetter_approbation_eng_sign(data.programmeId,data.programmeName,data.authorisedCompanyName,data.orgName,data.created,doc_code.random,doc_code.otp,new_data)
                                    }else{
                                    Intitule="Lettre d'approbation"
                                    //id pro
                                    save= true
                                URL=  await generateLetter_approbation_sign(data.programmeId,data.programmeName,data.authorisedCompanyName,data.orgName,data.created,doc_code.random,doc_code.otp,new_data)
                                    }
                                    break;
                                case "autorisation_letter":
                                    save = true
                                    if(lang=="eng"){
                                        Intitule="Autorization Letter"
                                        //id pro
                                        URL = await generateLetter_autorisation_eng_sign(doc_code.otp,"ministère de l'environ","M", data.programmeId, data.programmeName, data.authorisedCompanyName, data.orgName, data.designDocUrl, data.methodologyDocUrl,doc_code.random,new_data)
                                    }else{
                                        Intitule="Lettre d'autorisation"
                                        //id pro
                                        URL = await generateLetter_autorisation_sign(doc_code.otp,"ministère de l'environ","M",data.programmeId, data.programmeName, data.authorisedCompanyName, data.orgName, data.designDocUrl, data.methodologyDocUrl,doc_code.random,new_data)
                                    }
                                    
                                    break;
                                
                            }
                                    
                                
                                        
                                        // res.status(403).json({ message: 'Empty Token' })
                                    //creer un document
                                            
                                    if(save){
                                    let date = new Date()
                                        //delete last file
                                        let vals = await class_test.update(val._id,{
                                            
                                            
                                            Url:URL,
                                            upload_link:URL,
                                            Status:"accepted",
                                            Signed:true,
                                            Id_user_sign:req.body.Id_user,
                                            Date_modification : date,
                                    
                                
                                
                                
                                
                                
                                
                                        })
                                        // res.status(402).json({ message: 'Error Token' })
                                        let myemail= new class_email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",user_email)
                                    let dat=await myemail._main(val.Type,URL,"")

                                    
                                        if(val && (val.Type=="autorisation_letter")){
                                            let tokens = await apis.auth_register()
                                            let projet = await apis.autorise_itmo(data.programmeId,tokens.access_token)
                                            console.log(projet)
                                        }
                                        vals?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
                                
                                    }else{
                                        res.status(401).json({status:401, message: 'Type error' })
                                    }
                            
                            
                                
                        }else{
                            res.status(401).json({status:401, message: 'Error System' })
                        }
                    break;
                case "Idea_doc":
                
                    console.log(token.access_token)
                        if(isNotEmpty(token.access_token)){
                            let orgas_name=[]
                        
                            let projet = await apis.idea_get_idea(val.IdProjet)
                            if(projet.length!=0){
                            let orga = await apis.idea_get_organisation(projet[0].Id_organisation)
                            console.log(projet)
                            console.log(orga)
                            orgas_name.push(orga[0].Denomination_organisation)
                            user_email = orga[0].Email_organisation
                            let projet_data= projet[0]
                        
                        
                            
                            let data = {
                                programmeId:val.IdProjet, programmeName:projet_data.Ref_note_idee, authorisedCompanyName:"Bureau du marché carbone", orgName:orgas_name, designDocUrl:"https://skyvisionafrica.com", methodologyDocUrl:"https://skyvisionafrica.com"
                            }
                            let doc_code = {otp:val.Otp_code,random:val.Immat}
                            //let doc_code = await generate_global_code(val.Type)
                            //Betise @revoir
                            switch (val.Type) {
                                
                                case "objection_letter":
                                    Intitule="Lettre d'objection"
                                    //id idea
                                    
                                    save=true
                                    if(lang=="eng"){
                                        Intitule="NO OBJECTION LETTER"
                                        //id pro
                                        URL = await  generateLetter_objection_eng_sign(doc_code.otp,"Minister of environement","Test",orgas_name,data.programmeName,data.programmeId,doc_code.random,new_data)
                                    }else{
                                        Intitule="Lettre de non objectif"
                                        //id pro
                                        URL = await  generateLetter_objection_sign(doc_code.otp,"Minister of environement","Test",orgas_name,data.programmeName,data.programmeId,doc_code.random,new_data)
                                    }
                                    //mise à jour du status de la node d'idée; valide
                                    break;
                        
                                case "eligibilite_letter":
                                    Intitule="Lettre d'eligibilite"
                                    save=true
                                    if(lang=="eng"){
                                        URL=await generateLetter_eligibilite_eng_sign(doc_code.otp,data.programmeId,data.programmeName,"Energy",'Orgname',"orgadress","MaY","2024",doc_code.random,new_data)
                                    }else{
                                        URL=await generateLetter_eligibilite_sign(doc_code.otp,data.programmeId,data.programmeName,"Energy",'Orgname',"orgadress","MaY","2024",doc_code.random,new_data)
                                    }

                                    //mise à jour du status de la node d'idée; valide
                                    //id idea
                                
                                    break;
                                
                                
                            }
                                    
                                
                                        
                                        // res.status(403).json({ message: 'Empty Token' })
                                    //creer un document
                                            
                                    if(save){
                                    let date = new Date()
                                    let vals = await class_test.update(val._id,{
                                            
                                            
                                        Url:URL,
                                        upload_link:URL,
                                        Status:"accepted",
                                        Signed:true,
                                        Id_user_sign:req.body.Id_user,
                                        Date_modification : date,
                                
                            
                            
                            
                            
                            
                            
                                    })
                                    // res.status(402).json({ message: 'Error Token' })
                                    if(vals){
                                    const form3 = new FormData();
                                    form3.append('Note_ideeid',projet[0]._id);
                                    
                                    form3.append('Statut', "valide");
                                    let data = await apis.idea_update(form3)
                                }
                                    // if(data==1){
                                    //     res.json({status:200});
                                    // }else{
                                    //     res.json({status:400});
                                    // }
                                    let myemail= new class_email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",user_email)
                                    let dat=await myemail._main(val.Type,URL,"")
                                    vals?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
                                
                                    }else{
                                        res.status(401).json({status:401, message: 'Type error' })
                                    }
                            
                                    }else{
                                        res.status(401).json({status:401, message: 'Error Note' })
                                    }
                                
                        }else{
                            res.status(401).json({status:401, message: 'Error System' })
                        }
                    break;
                
                }
           
            }else{
                if(req.body.Status==="denied"||req.body.Status==="waiting"){
                    let date = new Date()
                    let vals = await class_test.update(val._id,{
                                            
                                            
                
                        Signed:false,
                        Status:req.body.Status,
                        Id_user_sign:req.body.Id_user,
                        Date_modification : date,
                
    
    
    
    
    
    
                    })
                    // res.status(402).json({ message: 'Error Token' })
                    
                    vals?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
                }else{
                    res.status(401).json({status:401, message: 'Status error' })
                }
                
            }
        }else{
            res.status(401).json({status:401, message: 'Error data or Authcode error' })        
        }
    }else{
        res.status(401).json({status:401, message: 'Empty data or Authcode error' })
    }
}
var ask_auth =async(req,res)=>{
    if(isNotEmpty(req.body.Id_user,req.body._id)&& verifierID(req.body._id)&& verifierID(req.body.Id_user)){
        
        let d_user = await class_user.read({_id:req.body.Id_user})
        let d_file = await class_test.read({_id:req.body._id})
        console.log(d_user)
        console.log(d_file)
        if(d_user.length===1 && d_file.length===1){
            let pass_=  generatecode(6)
            
        let val = await class_test.update(req.body._id,{Auth_code:pass_})
        const class_email = new email("Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",d_user[0].Email)
        
        let dat=await class_email._main("ask_auth","",pass_)
        console.log(dat)
        console.log(val)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        }else{
            res.status(401).json({status:401, message: 'Error data' })
        }
    }else{
        res.status(401).json({status:401, message: 'Empty data' })
    }
}
module.exports={
    create_projet_test:create_projet_test,
    create_idea_test:create_idea_test,
    read_test:read_test,
    read_global:read_global,
    update_test:update_test,
    add_doc_sign:add_doc_sign,
    delete_test:delete_test,
    sign_auto:sign_auto,
    ask_auth:ask_auth,
}