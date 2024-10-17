const { doc_api } = require("../models/api_central")
const {categorie,file} = require("../models/bdd")
const class_doc_api= new doc_api()


const class_cat = new categorie()
const class_file= new file()
var index = async(req, res) => {
 let id_user = req.session.id_user
 let stat = await class_doc_api._doc_stat(({Id_user:id_user}))
 console.log(stat.data.global.doc)


        res.render('ministry/dash',{layout:'./layouts/layout1/full-admin2',main:"dash",data:stat.data})
    
   

}
var detail = async(req, res) => {
     let id_user = req.session.id_user
    let doc = await class_doc_api._doc_read(({_id:req.params.id}))
   
    let data ={
        id_user:id_user,
        doc:doc.data[0]
    }
    res.render('ministry/detail_note',{layout:'./layouts/layout1/full-admin2',main:"doc",data:data})



}
var biblio =async (req,res)=>{
    let title = req.query.cat
    let file_data =[]
    let categorie=""
    let all_cat = await class_cat.read({})
    let all_file = await class_file.read({private:true})
    if(title!=undefined){
        let cat = await class_cat.read({title:title})
        console.log(cat)
        if(cat.length===1){
            categorie=title;
            file_data = await class_file.read({id_categorie:cat[0]._id,private:true})
        }else{
            file_data = await class_file.read({private:true})
        }
    }else{
        file_data = await class_file.read({private:true})
    }
    res.render('ministry/doc',{layout:'./layouts/layout1/full-admin2',main:"alldoc",categorie:categorie,cat_data:all_cat,file_data:file_data,
        all_file:JSON.stringify(all_file)})

}
module.exports = {
    
    
    index:index,
    detail:detail,
    biblio:biblio
     
 }