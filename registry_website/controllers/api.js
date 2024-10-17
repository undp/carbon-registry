const {categorie,file} = require("../models/bdd")
const fs = require('fs-extra')
const { generateauthenticateToken,isNotEmpty,check_admin, isObjectsuccess,verifierID } = require("../models/function")
const { admin, intern_server } = require("../setting/default")
const { doc_api } = require("../models/api_central")
const FormData = require('form-data');
const fss = require('fs');
const path = require('path');

const api = require("../models/api").api

let apis = new api()
const class_api= new api()
const class_cat = new categorie()
const class_file= new file()
const class_doc_api= new doc_api()
var waiting = async(req, res) => {
   
    let result = await apis.waiting(req.body.name,req.body.email,req.body.tel,req.body.country)
 console.log(result)
    if(result.status===200){
        res.json(result)
    }else{
        res.json({message:"error"})
    }
    

}
var login = async (req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body.password,req.body.user)){
        let d_admin = await class_doc_api._user_read({Role:"admin" ,TypeStruct:"ECO"})
        let d_admin2 = await class_doc_api._user_read({Role:"admin", TypeStruct:"ENV"})
        console.log(d_admin)
        let ver = false
        if(d_admin.status===200 ){
            if(d_admin.data.length!=0 && d_admin2.data.length!=0){
                ver=true
            }
        }
        if(ver){
            let d_login= await class_doc_api._user_login({Email:req.body.user,Password:req.body.password})
            if(d_login.status==200){
                let token =  generateauthenticateToken({user:d_login.data})
                req.session.token = token
                req.session.id_user=d_login.data._id
                req.session.typestruct=d_login.data.TypeStruct
                res.status(200).json({status:200, message: 'Success' ,token:token, go:d_login.data.Role})
            }else{
                res.status(200).json({status:407, message: 'Error data' })
            }
        }else{

            let check = await check_admin(req.body.user,admin)

            if(check){
                if(check.pass===req.body.password){
                    let token =  generateauthenticateToken({user:check.user})
                    req.session.token = token
                    req.session.typestruct="GLOBAL"
                    res.status(200).json({status:200, message: 'Success' ,token:token, go:"admin"})

                }else{
                    res.status(200).json({status:407, message: 'Error data' })
                }
            
                
            
        
            }else{
                res.status(200).json({status:407, message: 'Error data' })
            }
        }
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}
var create_categorie = async(req,res)=>{
  
    if(isNotEmpty(req.body.title) ){
      
           let read= await class_cat.read({title:req.body.title})
           if(read.length!=1){
            let val = await class_cat.create({
               
                title:req.body.title,
                date: new Date()
            })
            isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
           }else{
            res.status(200).json({status:401, message: 'User error' })
           }
           
           
       
      
        
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
    
   
}

var read_categorie = async(req,res)=>{

    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
        let val = await class_cat.read(req.body)
     
      
        isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
    }else{
        if(req.body._id===undefined){
            let val = await class_cat.read(req.body)
     
      
            isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
        }else{
            res.status(405).json({status:405, message: 'Error Id' })
        }
        
    }
}
var update_categorie = async(req,res)=>{
    if(isNotEmpty(req.body._id) && verifierID(req.body._id)){
       

        let val = await class_cat.update(req.body._id,req.body)

        console.log(val)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}
var delete_categorie = async(req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
    
       
        let fil = await class_file.read({id_categorie:req.body._id})
        await Promise.all( fil.map(async (elt) => {

                        console.log(fs.existsSync("./uploads/"+elt.link))
                        if (fs.existsSync("./uploads/"+elt.link)) {
                            // Supprime le fichier
                           await fs.remove("./uploads/"+elt.link, async err => {
                                if (err) {
                                    console.error('Erreur lors de la suppression du fichier :', err);
                                } else {
                                    await class_file.delete(elt._id)
                                }
                            });
                        }
                        
                   }));
        //delete all file
       let val = await class_cat.delete(req.body._id)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}

var create_file = async(req,res)=>{
   console.log(req.body)
   console.log(req.files)

    if(isNotEmpty(req.body.id_categorie) ){
        let verf = await class_cat.read({_id:req.body.id_categorie})
   console.log(verf)
   let private 
   if(isNotEmpty(req.body.private)){private=req.body.private}else{private=true}
   let val
        if(verf.length==1){
            if(isNotEmpty(req.body.title)){
                if(req.files.length>1){
                    await Promise.all( req.files.forEach(async (elt,index) => {
                        val = await class_file.create({
                           id_categorie:req.body.id_categorie,
                           link:elt.filename,
                           title:req.body.title+"-"+index,
                           private:private,
                           date: new Date()
                       })
                   }));
                }else{
                    await Promise.all( req.files.forEach(async (elt) => {
                        val = await class_file.create({
                           id_categorie:req.body.id_categorie,
                           link:elt.filename,
                           title:req.body.title,
                           private:private,
                           date: new Date()
                       })
                   }));
                }
               
                
               
                isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
            }else{
               
               
                await Promise.all( req.files.map(async (elt) => {
              
                    val = await class_file.create({
                       id_categorie:req.body.id_categorie,
                       link:elt.filename,
                       title:elt.originalname,
                       private:private,
                       date: new Date()
                   })
               }))
              
                isObjectsuccess(val._id)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
            }
          
        }else{
            res.status(200).json({status:401, message: 'Error ID' })
        }
           
         
           
       
      
        
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
    
   
}

var read_file = async(req,res)=>{

    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
       
        let val = await class_file.read(req.body)
     
      
        isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
    }else{
        if(req.body._id===undefined){
            let val = await class_file.read(req.body)
     
      
            isObjectsuccess(val)?res.status(200).json({status:200, message: 'Success',data:val }):res.status(404).json({status:404, message: 'Error system' })
        }else{
            res.status(405).json({status:405, message: 'Error Id' })
        }
        
    }
}
var update_file = async(req,res)=>{
    if(isNotEmpty(req.body._id) && verifierID(req.body._id)){
       
    
        let val = await class_file.update(req.body._id,req.body)

        console.log(val)
       val?res.status(200).json({status:200, message: 'Success' }):res.status(404).json({status:404, message: 'Error system' })
        
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}
var delete_file = async(req,res)=>{

    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
        let ver = await class_file.read({_id:req.body._id})
        if(ver.length===1){
            if (fs.existsSync("./uploads/"+ver[0].link)) {
                // Supprime le fichier
               await fs.remove("./uploads/"+ver[0].link, async err => {
                    if (err) {
                        res.status(404).json({status:404, message: 'Error system' })
                    } else {
                        let val = await class_file.delete(req.body._id)
                        //delete extra file
                       val?res.status(200).json({status:200, message: 'Success' }):res.status(200).json({status:404, message: 'Error system' })
                    }
                });
            }
          
        }else{
            res.status(200).json({status:401, message: 'Error data' })
        }

       
        
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}

var ask_auth_file = async (req,res)=>{

    if(isNotEmpty(req.body._id) && verifierID(req.body._id) ){
      let  Id_user =req.session.id_user
        let d_file =await class_doc_api._doc_ask_auth({
            _id:req.body._id,
            Id_user:Id_user
        })
        console.log(d_file)

        if(d_file.status==200){
           
            res.status(200).json({status:200, message: 'Success' })
        }else{
            res.status(200).json({status:407, message: 'Error data' })
        }
    }else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}
var get_projetbyid_orga=async(req,res)=>{
    if(isNotEmpty(req.body.id) ){
      let need =100
      let total = await apis.projet_list(1,need,req)
      if(total.load){
        total=await apis.projet_list(1,need,req)
  
         }
         
    if(!total.error){
      
      let length = parseInt(total.list.total)
      let data =[]
      let data_tot_send=[]
      console.log(length)
      let boucle = Math.trunc(length/need)
      
        console.log(boucle)
      if(boucle<(length/need) || boucle<=0 ){
        boucle=boucle+1
      }
      for (let i = 1; i <= boucle; i++){
      let mindata =await apis.projet_list(i,need,req)
      console.log(mindata.list.data)
      data=data.concat(mindata.list.data)
 
      }

      data.map(elt=>{
        let vers = elt.companyId
    
        if(vers.includes(req.body.id)){
          data_tot_send.push(elt)
        }
      })
     
      res.status(200).json({status:200, error:false,total:data_tot_send.length,data:data_tot_send})
    }else{
       
        res.status(200).json({status:401,error:true,data:[] ,message: 'Empty data' })
    }}else{
        res.status(200).json({status:401, message: 'Empty data' })
    }
}

var search_project= async (req,res)=>{
    let need = 100

    let go ={
        error :true
    }
    let ver=await class_api.projet_list(1,need,req)
    console.log(ver)
    if(ver.load){
        ver=await class_api.projet_list(1,need,req)
        console.log(ver)
    }
    if(!ver.error){
        let length = parseInt(ver.list.total)
        let boucle = Math.trunc(length/need)
        if(boucle<(length/need) || boucle<=0 ){
            boucle=boucle+1
          }
       
        let data = []
        for (let i = 1; i <= boucle; i++){
            let mindata =await apis.projet_list(i,need,req)
           
            data=data.concat(mindata.list.data)
       
            }
      
        let search= data.map(item => {
            return {
              url: "/projet/"+item.programmeId,
              label: item.title
            };
          });
       
        go ={
            search:search,
            error:false,

        }
       console.log(go.search)
        // console.log(page)
    }
    res.json(go)
}
var search_orga= async (req,res)=>{
    let need = 9

    let go ={
        error :true
    }
    let ver=await class_api.orga_list(1,need,req)
    console.log(ver)
    if(ver.load){
        ver=await class_api.orga_list_list(1,need,req)
        console.log(ver)
    }
    if(!ver.error){
       

        let search= ver.list.data.map(item => {
            return {
              url: "/org/"+item.companyId,
              label: item.name
            };
          });
       
        go ={
            search:search,
            error:false,

        }
       console.log(go.search)
        // console.log(page)
    }
    res.json(go)
}
var search_file_private= async (req,res)=>{
   
    file_data = await class_file.read({private:true})
  

       

        let search=  file_data.map(item => {
            return {
              url: intern_server+"/"+ item.link,
              label: item.title
            };
          });
       
       let go ={
            search:search,
            error:false,

        }
      
    res.json(go)
}

var search_file_mine= async (req,res)=>{
   
    file_data = await class_file.read({private:false})
  

       

        let search=  file_data.map(item => {
            return {
              url: intern_server+"/"+ item.link,
              label: item.title
            };
          });
       
       let go ={
            search:search,
            error:false,

        }
      
    res.json(go)
}
var add_sign = async (req,res)=>{
    console.log(req.file)
    console.log(req.body)
    let id_user = req.session.id_user
    if(isNotEmpty(req.body.Status) ){
        let val
        let doc = await class_doc_api._doc_read({_id:req.body._id})
        switch (req.body.Status) {
            case "accepted":
                const form = new FormData();
                let pat = path.join( req.file.path)
              
                switch (req.body.Type) {
                    case "sign":
                        form.append('_id', req.body._id);
                        form.append('Id_user', id_user);
                        form.append('Status','accepted');
                        form.append('Auth_code', req.body.Auth_code);
                        form.append('signature', fss.createReadStream(pat));
                        console.log(form) 
                     val = await class_doc_api._doc_sign_auto(form) 
                     
                     console.log(val)
                        break;
                    case "file":
                        form.append('Id_user', id_user);
                        form.append('Id_pro_idea',doc.data[0].IdProjet)
                        form.append('Type',doc.data[0].Type)
                        form.append('file', fss.createReadStream(pat));
                        console.log(form) 
                        val = await class_doc_api._doc_sign_file(form) 
                        console.log(val)
                        break;
                    
                }
                break;
            case "denied":
                val = await class_doc_api._doc_sign_auto_json({
                    _id:req.body._id,
                    Id_user:id_user,
                    Status:"denied",
                    Auth_code:req.body.Auth_code
                }) 
                break;
            case "waiting":
                val = await class_doc_api._doc_sign_auto_json({
                    _id:req.body._id,
                    Id_user:id_user,
                    Status:"waiting",
                    Auth_code:req.body.Auth_code
                }) 
                break;
        }
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
   
}

//role
var add_role = async(req,res)=>{
    if(isNotEmpty(req.body.title)){
        val = await class_doc_api._role_create({Intitule_role:req.body.title}) 
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
}

var delete_role=async(req,res)=>{
    if(isNotEmpty(req.body._id)){
        val = await class_doc_api._role_delete({_id:req.body._id}) 
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
}
var update_role = async (req,res)=>{
    if(isNotEmpty(req.body._id)){
        val = await class_doc_api._role_update(req.body) 
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
}
//user

var add_user = async(req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body.Nom,req.body.Prenom,req.body.Email,req.body.Role)){
        val = await class_doc_api._user_create({Nom:req.body.Nom,Prenom:req.body.Prenom,Email:req.body.Email,Role:req.body.Role,TypeFile:req.body.TypeFile,TypeStruct:req.body.TypeStruct}) 
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
}
var update_user = async(req,res)=>{
    console.log(req.body)
    if(isNotEmpty(req.body._id)){
        val = await class_doc_api._user_update(req.body) 
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
}
var delete_user=async(req,res)=>{
    if(isNotEmpty(req.body._id)){
        val = await class_doc_api._user_delete({_id:req.body._id}) 
        res.status(200).json(val)
    }else{
        res.status(200).json({status:407, message: 'Error data' })
    }
}

module.exports = {
    
    
    waiting:waiting,
    login:login,
    create_categorie:create_categorie,
    read_categorie:read_categorie,
    update_categorie:update_categorie,
    delete_categorie:delete_categorie,
    create_file:create_file,
    read_file:read_file,
    update_file:update_file,
    delete_file:delete_file,
    get_projetbyid_orga:get_projetbyid_orga,
    search_project:search_project,
    search_orga:search_orga,
    search_file_private:search_file_private,
    search_file_mine:search_file_mine,
    //

    ask_auth_file:ask_auth_file,
    add_sign:add_sign,


    add_role:add_role,
    delete_role:delete_role,
    update_role:update_role,


    add_user:add_user,
    delete_user:delete_user,
    update_user:update_user,



    
}