const { categorie ,file} = require("../models/bdd")
const class_cat = new categorie()
const class_file = new file()
const { doc_api } = require("../models/api_central")
const class_doc_api= new doc_api()
var login = async(req, res) => {
  
    res.render('admin/login',{layout:false})

}
var signlog = async(req, res) => {
  
    res.render('admin/signlog',{layout:false})

}
var dash = async(req, res) => {
    if(req.session.token!=undefined){
        let data_cat = await class_cat.read({})
        let data_file = await class_file.read({})
        let data_files =[]
        await Promise.all( data_file.map(async (elt,index) => {
           
            let val = await class_cat.read({
               _id:elt.id_categorie,
              
           })
            
           
           data_files.push({
            elt,
            categorie:val[0].title
        
        })
       }))
        res.render('admin/dash',{layout:'./layouts/layout1/full-admin',main:"dash",token:req.session.token,data_cat:data_cat,data_file:data_files})
    }else{
        res.redirect("/myregister")
    }
    

}
var setting = async(req,res)=>{
let d_role = await class_doc_api._role_read()
let d_admin =  await class_doc_api._user_read()
let d_adm=[]
Type_struct = req.session.typestruct
await Promise.all(d_admin.data.map(async(elt)=>{
 if(Type_struct==elt.TypeStruct ||Type_struct=="GLOBAL"){
    let file_type = []
    elt.TypeFile.map((elts)=>{
        file_type.push(d_role.data.find(item => item._id === elts))  
    })
    d_adm.push({
        user:elt,
        typefile: file_type
    })
}
}))


    res.render('admin/setting',{layout:'./layouts/layout1/full-admin',main:"setting",token:req.session.token,d_role:d_role.data,d_admin:d_adm,Type_struct:Type_struct})
}
var deco =async (req,res)=>{
    req.session.destroy()
    res.redirect("/myregister")
}
var active = async (req,res)=>{
  
    console.log(req.params.id)
    let d_admin =  await class_doc_api._user_active({Id:req.params.id,Code:req.params.code})
    if(d_admin.status==200){
        res.redirect("/myregister")
    }else{
        res.redirect("/404")
    }
}
module.exports={
    login:login,
    dash:dash,
    setting:setting,
    signlog:signlog,
    deco:deco,
    active:active
}