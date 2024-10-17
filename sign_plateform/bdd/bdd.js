mongoose = require("mongoose");

const { conf_bdd } = require("../settings/default");




if(conf_bdd.auth){

    let auth = {
        "auth" :{
            "username":conf_bdd.user,
            "password":conf_bdd.pass
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


var Documents = mongoose.Schema({
    Intitule: String,
    IdProjet:String,
    Type: String,
    Otp_code: String,
    Numero_de_validation: String,
    Immat:String,
    Url:String,
    upload_link:String,
    TypeFile:String,
    Signed:Boolean,
    Date_creation : String,
    Date_modification : String,
    Role:String,
    Status:String,
    Id_user_sign:String,
    Auth_code:String,
    Datesystem: String,
  });
  
  var Utilisateur = mongoose.Schema({
    Nom: String,
    Prenom: String,
    Poste:String,
    Email: String,
    Role: String,
    Statut: String,
    Otp_code: String,
    TypeFile:Array,
    TypeStruct:String,//ENV , GLOBAL, ECO
    Password_hashed: String,
    Date_creation: String,
    Date_modification: String,
    Datesystem: String,
  });
  


var test = mongoose.Schema({
   
    test:String,
   
  
});

var role = mongoose.Schema({
    Intitule_role :String,
    TypeStruct:String,//ENV , GLOBAL, ECO
    Default:Boolean,
    Date_creation : Date,
    Date_modification : Date,
    Datesystem : Date,
})
var Test =mongoose.model('Test', test) 
var Role =mongoose.model('Role', role) 
var Utilisateur = mongoose.model("Utilisateur", Utilisateur);
var Documents = mongoose.model("Documents", Documents);

module.exports = {
    Test:Test,
    Utilisateur:Utilisateur,
    Documents:Documents,
    Role:Role

}
