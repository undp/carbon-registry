const { parse } = require("path")

const { api } = require("../models/api_central")
const { isNotEmpty, countByStatus,getData } = require("../models/function")
const { user_example } = require("../setting/default")
const _default = require("../setting/default")
const url_file =_default.api_url_3

const class_api= new api()


//compte d'Eligibilité

var eligi_start = async (req,res)=>{
  
    
    res.render('eligi/eligi_start',{layout:'./layouts/layout1/full-width3',main:"Eligibilité",area:"eligibilite",title:"Formulaire", description:"Formulaire de soumission"})
}
var eligi_order = async (req,res)=>{
  
    let id=req.user_eligi.user
    let data = await class_api.get_organisation_ideas(id)
    let organisation = await class_api.get_organisation(id)
    let file={
        RCCM:getData(organisation[0].Fichier,"RCCM"),
        DFE:getData(organisation[0].Fichier,"DFE"),
        LOGO:getData(organisation[0].Fichier,"Logo_organisation")
    }
    let stat = await countByStatus(data)
    res.render('eligi/eligi_order',{file:file,stat:stat,url_file:url_file,data:data,orga:organisation,layout:'./layouts/layout1/full-width3',main:"Eligibilité",area:"eligibilite",title:"Compte", description:"Mon compte",saccount:"order"})
}
var eligi_ideas = async (req,res)=>{
 
    let id=req.user_eligi.user
    let data = await class_api.get_organisation_ideas(id)
    let organisation = await class_api.get_organisation(id)
    let file={
        RCCM:getData(organisation[0].Fichier,"RCCM"),
        DFE:getData(organisation[0].Fichier,"DFE"),
        LOGO:getData(organisation[0].Fichier,"Logo_organisation")
    }
    console.log(file)
    let stat = await countByStatus(data)
    res.render('eligi/eligi_ideas',{file:file,stat:stat,url_file:url_file,data:data,orga:organisation,data:data,layout:'./layouts/layout1/full-width3',main:"Eligibilité",area:"eligibilite",title:"compte", description:"Mes notes d'idée", saccount:"ideas"})
}
var eligi_note = async (req,res)=>{
    
    let ide = req.params.id
    let id=req.user_eligi.user
    let idea = await class_api.get_idea(ide)
    let organisation = await class_api.get_organisation(id)
    let file={
        RCCM:getData(organisation[0].Fichier,"RCCM"),
        DFE:getData(organisation[0].Fichier,"DFE"),
        LOGO:getData(organisation[0].Fichier,"Logo_organisation")
    }
  
    let data = await class_api.get_organisation_ideas(id)
    let pay = await class_api.get_pay(idea[0].Idpayement)
    // let stat =
    let stat = await countByStatus(data)
    // console.log(organisation[0].Fichier)
    res.render('eligi/eligi_note',{stat:stat,file:file,pay:pay[0],url_file:url_file,data:data,idea:idea,orga:organisation,data:data,layout:'./layouts/layout1/full-width3',main:"Eligibilité",area:"eligibilite",title:"compte", description:"Ma note", saccount:"note"})
}
var eligi_param = async (req,res)=>{
    let id=req.user_eligi.user
    let organisation = await class_api.get_organisation(id)
    let data = await class_api.get_organisation_ideas(id)
    let stat = await countByStatus(data)
    let file={
        RCCM:getData(organisation[0].Fichier,"RCCM"),
        DFE:getData(organisation[0].Fichier,"DFE"),
        LOGO:getData(organisation[0].Fichier,"Logo_organisation")
    }
    res.render('eligi/eligi_param',{stat:stat,file:file,url_file:url_file,data:data,orga:organisation,layout:'./layouts/layout1/full-width3',main:"Eligibilité",area:"eligibilite",title:"compte", description:"Paramètre", saccount:"param"})
}
var eligi_pay = async (req,res)=>{
    let id=req.user_eligi.user
    let organisation = await class_api.get_organisation(id)
    let data = await class_api.get_organisation_ideas(id)
    let tab_pay=[]
   
    await Promise.all(data.map(async (elt) => {
      let contents = await class_api.get_pay(elt.Idpayement)
   
        tab_pay.push(
            {
                pay:contents[0],
                idea:elt
            }
           
        )
      }));
      let stat = await countByStatus(data)
    console.log(tab_pay)
    res.render('eligi/eligi_pay',{stat:stat,tab_pay:tab_pay,url_file:url_file,data:data,orga:organisation,layout:'./layouts/layout1/full-width3',main:"Eligibilité",area:"eligibilite",title:"compte", description:"Paiement", saccount:"pay"})
}

var eligi_deco = async (req,res)=>{
    req.session.destroy()
    res.redirect("/eligibilite#deco")
}
module.exports = {
    

   eligi_start:eligi_start,
   eligi_order:eligi_order,
   eligi_ideas:eligi_ideas,
   eligi_note:eligi_note,
   eligi_param :eligi_param ,
   eligi_pay:eligi_pay,
   eligi_deco:eligi_deco
}