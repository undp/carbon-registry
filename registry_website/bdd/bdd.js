

const { default: mongoose } = require("mongoose");
const { conf_bdd } = require("../setting/default");




if(conf_bdd.auth){

    let auth = {
        "auth" :{
            "username":conf_bdd.user,
            "password":conf_bdd.user
        },
        "authSource":conf_bdd.authsource
    }


    mongoose.connect(conf_bdd.uri,auth)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });

}else{
    mongoose.connect(conf_bdd.uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

}

var categorie = mongoose.Schema({
   
    title:String,
    date:Date,
});
var file = mongoose.Schema({
   
    title:String,
    link:String,
    id_categorie:String,
    private:Boolean,
    date:Date
  
});
var Categorie =mongoose.model('Categorie', categorie) 
var File = mongoose.model('File', file) 
module.exports = {
    Categorie:Categorie,
    File:File

}
