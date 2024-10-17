const { parse } = require("path")
const {categorie,file} = require("../models/bdd")
const { api } = require("../models/api")
const { isNotEmpty , searchProgrammes} = require("../models/function")
const { localisation_bmc, Doc_server, intern_server ,ia} = require("../setting/default")
const class_cat = new categorie()
const class_file= new file()
const class_api= new api()
var index = async(req, res) => {
    let data = await class_api.statistic(req)
    
    if(data.load){
        data=await class_api.statistic(req)

       
    }
    let projets=await class_api.projet_list(1,4,req)
    let projet=await class_api.projet_list(1,projets.list.total,req)
    if(!data.error){
        
        let go = {
            total_projet:projet.list.total
        }
        console.log(projet.list.data[53])
        res.render('global/index',{go:go,data:data.list.stats.AGG_PROGRAMME_BY_STATUS.data[1],projet:projet.list.data.slice(-4),layout:'./layouts/layout1/full-width'})
    }else{
        res.render('global/index',{layout:'./layouts/layout1/full-width'})
    }
   

}
var apropos = async(req,res)=>{
    res.render('global/apropos',{layout:'./layouts/layout1/full-width2',area:"apropos",title:"A propos", description:"Découvrez nos motivations et notre raison d’être"})
}
var explorer = async(req,res)=>{
    res.render('global/explorer',{layout:'./layouts/layout1/full-width2',area:"explorer",title:"Explorer", description:"Vue générale du registre"})
}
var eligibilite = async (req,res)=>{
    res.render('global/eligibilite',{layout:'./layouts/layout1/full-width4',area:"eligibilite",title:"Eligibilité", description:"Critères d’éligibilité"})
}
var contact = async (req,res)=>{
   
    res.render('global/contact',{layout:'./layouts/layout1/full-width2',area:"contact",title:"Contact", description:"Vous voulez nous joindre ? C’est par ici",
        data_s:JSON.stringify(localisation_bmc), data:localisation_bmc, intern_server:intern_server}
    
    )
}
var faq = async (req,res)=>{
    res.render('global/faq',{layout:'./layouts/layout1/full-width3',area:"ressources",main:"Ressources",title:"FAQ", description:"Vos questions fréquemment posées"})
}
var document = async (req,res)=>{
    let title = req.query.cat
    let file_data =[]
    let categorie=""
    let all_cat = await class_cat.read({})
    let all_file = await class_file.read({private:false})
    if(title!=undefined){
        let cat = await class_cat.read({title:title})
        console.log(cat)
        if(cat.length===1){
            categorie=title;
            file_data = await class_file.read({id_categorie:cat[0]._id,private:false})
        }else{
            file_data = await class_file.read({private:false})
        }
    }else{
        file_data = await class_file.read({private:false})
    }
  
    res.render('global/document',{all_file:JSON.stringify(all_file),categorie:categorie,cat_data:all_cat,file_data:file_data,layout:'./layouts/layout1/full-width3',area:"ressources",main:"Ressources",title:"Documents", description:"Tous les documents du registre",intern_server:intern_server})
}
var verify = async (req,res)=>{
    // Utilisation d'une expression régulière pour trouver tous les chiffres
    let idrc=""
    if(isNotEmpty(req.query.idrc)){
        let matricule =req.query.idrc
        const numbers = matricule.match(/\d+/g);
        (numbers) ? idrc=numbers.join('') : idrc=''
    }

  
  // Joindre tous les chiffres trouvés en une seule chaîne

    res.render('global/verify',{idrc:idrc,layout:'./layouts/layout1/full-width3',area:"ressources",main:"Ressources",title:"Vérification", description:"Vérifier l'authenticité de tous les documents"})
}
var projet= async(req,res)=>{
    let more=""
    let need = 9

    let go ={
        error :true
    }
    let ver=await class_api.projet_list(1,need,req)

    if(ver.load){
        ver=await class_api.projet_list(1,need,req)
      
    }
    if(!ver.error){
       
        let length
        let data
        ver.list.data
       

        let sectors  =Array.from(new Set(ver.list.data.map(item => item.sector)));
        let region= Array.from(new Set(ver.list.data.map(item => item.programmeProperties.geographicalLocation)));
        let regions =Array.from(new Set(region.flat()))
        let autor = Array.from(new Set(ver.list.data.map(item=>item.currentStage)))
      
        let pg = req.query.page
    
        pg= parseInt(pg)
        let reference=1;
    
        if(!isNaN(pg) && Number.isInteger(pg)){
            reference=pg
        }

        if(isNotEmpty(req.query.sector)||isNotEmpty(req.query.region)||isNotEmpty(req.query.status)){
            (isNotEmpty(req.query.sector))?more=more+"&sector="+req.query.sector:null;
            (isNotEmpty(req.query.region))?more=more+"&region="+req.query.region:null;
            (isNotEmpty(req.query.status))?more=more+"&status="+req.query.status:null;
            let vers=await class_api.projet_list(1,ver.list.total,req)
             data = await searchProgrammes(vers.list.data,req.query.status,req.query.sector,req.query.region)
             length = data.length
             data = data.slice((reference-1)*need, reference*need);
        }else{
            data=await class_api.projet_list(reference,need,req)
            length = parseInt(ver.list.total) 
            data=data.list.data
           
        }
        let page = Math.trunc(length/need)
            
            if(page<(length/need)){
                page=page+1
            }
            let current_sector=""
            let current_region=""
            let current_status=""
            isNotEmpty(req.query.sector)?current_sector=req.query.sector:null;
           isNotEmpty(req.query.region)?current_region=req.query.region:null;
            isNotEmpty(req.query.status)?current_status=req.query.status:null;

         
        go ={
            total_pro:length,
            error:false,
            page:page,
            reference:reference,
            data:data,
            sectors:sectors,
            regions:regions,
            autor:autor,
            more:more,
            current_sector:current_sector,
            current_region:current_region,
            current_status:current_status,
        }
        console.log('sind'+current_status)
        // console.log(page)
    }

    res.render('global/projet',{data:go,more:more,layout:'./layouts/layout1/full-width2',area:"projet",title:"Projets", description:"Tous les projets"})
}
var projet_detail= async(req,res)=>{
    if(isNotEmpty(req.params.id)){
        let id = req.params.id
        let data = await class_api.single_projet(id,req)
    
        if(data.load){
            data=await class_api.single_projet(id,req)
           
        }
        
        if(!data.error){
            
            let n_need=40
            let ndc_data=[]
            let ndc_data_goal=[]
            //
            let Parsetable = data.list.data[0].companyId.map(element => parseInt(element));
            let ds = await class_api.single_orga2(Parsetable,req)
            let ndcs =await class_api.list_ndc(id,1,20,req)
            let n_length=ndcs.list.total
            // 
            let boucle = Math.trunc(n_length/n_need)
              
            if(boucle<(n_length/n_need) || boucle<=0 ){
                boucle=boucle+1
            }
            for (let i = 1; i <= boucle; i++){
            let mindata =await class_api.list_ndc(id,i,n_need,req)
            console.log(mindata.list.data)
            ndc_data=ndc_data.concat(mindata.list.data)
        
            }
            ndc_data.map(elt=>{
                ndc_data_goal=ndc_data_goal.concat(elt.coBenefitsProperties.sdgGoals)
            })
            
            ndc_data_goal = ndc_data_goal.filter((element, index) => {
                return ndc_data_goal.indexOf(element) === index;
            });
    //   
   
            res.render('global/projet_detail',{data_ndc:ndc_data_goal,data_orga:ds.list,data:data.list,layout:'./layouts/layout1/full-width3',main:"Projet",area:"projet",title:data.list.data[0].title , description:""})
        }else{
            res.redirect("/404")
        }
       
    }else{
        res.redirect("/404")
    }
   
}
var secteur= async(req,res)=>{
    res.render('global/secteur',{layout:'./layouts/layout1/full-width3',main:"Explorer",area:"explorer",title:"Secteurs & Sous-secteurs", description:"Tableau des secteurs et sous secteurs"})
}
var credit= async(req,res)=>{
    let data = await class_api.statistic(req)
    
        if(data.load){
            data=await class_api.statistic(req)
    
           
        }
        
        if(!data.error){
            let n_need=40
            let ndcs =await class_api.list_global_ndc(1,20,req)
            let n_length=ndcs.list.total
            let ndc_data =[]
            let boucle = Math.trunc(n_length/n_need)
              
            if(boucle<(n_length/n_need) || boucle<=0 ){
                boucle=boucle+1
            }
            for (let i = 1; i <= boucle; i++){
            let mindata =await class_api.list_global_ndc(i,n_need,req)
           
            ndc_data=ndc_data.concat(mindata.list.data)
        
            }
            console.log(ndc_data)
            res.render('global/credit',{ndc_data:ndc_data,data:data.list.stats.AGG_PROGRAMME_BY_STATUS.data[1],layout:'./layouts/layout1/full-width3',main:"Explorer",area:"explorer",title:"Crédit", description:"Tableau et statistique des crédits"})

        }else{

        }
   
}
var dash= async(req, res) => {
  
    res.render('global/dash',{layout:'./layouts/layout1/full-width'})

}
var landing= async(req, res) => {
  
    res.render('global/model',{layout:'./layouts/layout1/full-width'})

}
var organisation = async(req,res)=>{
    let need = 6

    let go ={
        error :true
    }
    let ver=await class_api.orga_list(1,need,req)
    console.log(ver)
    if(ver.load){
        ver=await class_api.orga_list(1,need,req)
        console.log(ver)
    }
    if(!ver.error){

        let length = parseInt(ver.list.total) 
        console.log(ver.list.total)
        let pg = req.query.page
    
        pg= parseInt(pg)
        let reference=1;
    
        if(!isNaN(pg) && Number.isInteger(pg)){
            reference=pg
        }
        let data=await class_api.orga_list(reference,need,req)
    
    
        let page = Math.trunc(length/need)
        
        if(page<(length/need)){
            page=page+1
        }
        go ={
            total_pro:length,
            error:false,
            page:page,
            reference:reference,
            data:data.list.data
        }
        console.log(reference)
        console.log(page)
    }

    res.render('global/organisation',{data:go,layout:'./layouts/layout1/full-width3',main:'Explorer',area:"explorer",title:"Organisation", description:"Toutes les organisations"})
}
var detail_orga = async(req,res)=>{
    
    if(isNotEmpty(req.params.id)){
        let id = parseInt(req.params.id)
        let data = await class_api.single_orga(id,req)
        console.log(data)
        if(data.load){
            data=await class_api.single_orga(id,req)
           
        }
        console.log(data)
        if(!data.error){
            console.log(data)
            res.render('global/detail_orga',{data:data.list,layout:'./layouts/layout1/full-width3',main:'Explorer',area:"explorer",title:"Organisation", description:data.list[0].name})
        }else{
            res.redirect("/404")
        }
       
    }else{
        res.redirect("/404")
    }
   
}

//compte d'Eligibilité

var eligi_start = async (req,res)=>{
    res.render('global/eligi_start',{layout:'./layouts/layout1/full-width2',area:"eligibilite",title:"Eligibilité", description:"Formulaire de soumission"})
}

var aibot = async (req,res)=>{
   
    res.render('global/ai',{layout:false,data_ia:JSON.stringify(ia)})
}
module.exports = {
    
    
   index:index,
   apropos:apropos,
   explorer:explorer,
   eligibilite:eligibilite,
   contact:contact,
   faq:faq,
   document:document,
   verify: verify,
   projet: projet,
   projet_detail:projet_detail,
   secteur:secteur,
   credit:credit,
   dash:dash,
   landing:landing,
   organisation:organisation,
   detail_orga:detail_orga,
   eligi_start:eligi_start,
   aibot :aibot 
    
}