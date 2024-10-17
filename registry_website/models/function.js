
const { JWT_SECRET ,JWT_Token_duration, JWT_SECRET_ELIGI,JWT_Token_ELIGI_duration } = require("../setting/default");
const jwt = require('jsonwebtoken');


function isNotEmpty(...variables) {
    for (let variable of variables) {
        // Vérifie si la variable est définie et qu'elle n'est pas égale à null ou undefined
        if (variable != null && variable !== undefined) {
            // Si la variable est un objet, vérifie sa longueur (s'il s'agit d'un tableau ou d'une chaîne de caractères)
            if (typeof variable === 'object' && Object.keys(variable).length === 0) {
                return false;
            }
            // Si la variable est une chaîne de caractères, vérifie sa longueur
        
            if (typeof variable === 'string' && variable.trim().length === 0) {
                return false;
            }
            // Si la variable est un nombre, un booléen, etc., elle est considérée comme non vide
            continue; // Passe à la prochaine variable
        }
        // Si la variable n'est pas définie ou qu'elle est nulle, elle est considérée comme vide
        return false;
    }
    // Si toutes les variables sont non vides, renvoie true
    return true;
}
function isObjectsuccess(variable){
    if (typeof variable === 'object') {
        if( Object.keys(variable).length === 0){
            return true;
        }
        if(variable.length==0 || variable.length!=0){
            return true;
        }
       
    }
   
    return false
}
function auth_user_admin(req,res,next){
        console.log(req.session)
        
        const token =  req.session.token;
    
        if ( !isNotEmpty(token,req.session.typestruct)){
            console.log("err1")
            res.redirect("/myregister");
        }else{
            jwt.verify(token, JWT_SECRET, async (err, user) => {
                console.log(user)
                if (err){
                    console.log("err"+err.message)
                    res.redirect("/myregister");
                } else{
                    req.user = user;
                    console.log("oko")
                    next();
                }
                
            });
        }
}
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(200).json({status:401, message: 'Token Empty' });
  
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) return res.status(200).json({ stauts:403,message: 'Token Error' });
      req.user = user;
      
      next();
    });
  }
  function authenticateliigiToken(req, res, next) {
    console.log(req.session)
    
        const token = req.session.eligi_token;
    console.log(req.session.eligi_token)
        if ( !isNotEmpty(token)){
            console.log("err1")
            res.redirect("/eligibilite#log");
        }else{
            jwt.verify(token, JWT_SECRET_ELIGI, async (err, user) => {
                console.log(user)
                if (err){
                    console.log("err"+err.message)
                    res.redirect("/eligibilite#log");
                } else{
                    req.user_eligi = user;
                    console.log("oko")
                    next();
                }
                
              });
        }
      

    
  }

function generateauthenticateToken (data){
    
    return jwt.sign(data, JWT_SECRET, { expiresIn: JWT_Token_duration });
    
}
function generateliigiToken (data){
    
    return jwt.sign(data, JWT_SECRET_ELIGI, { expiresIn: JWT_Token_ELIGI_duration });
    
}
async function searchProgrammes(dataArray, currentStage, sector, geographicalLocation) {
    return dataArray.filter(data => {
       
      // Vérifier currentStage s'il n'est pas vide
      const currentStageMatch = currentStage ? data.currentStage === currentStage : true;
  
      // Vérifier sector s'il n'est pas vide
      const sectorMatch = sector ? data.sector === sector : true;
  
      // Vérifier geographicalLocation s'il n'est pas vide
      const geographicalLocationMatch = geographicalLocation ? 
        data.programmeProperties.geographicalLocation.includes(geographicalLocation) : 
        true;
  
      // Retourner vrai seulement si toutes les conditions correspondantes sont remplies
      return currentStageMatch && sectorMatch && geographicalLocationMatch;
    });
  }


function verifierID(id) {
    // Expression régulière pour vérifier si l'ID est une chaîne hexadécimale de 24 caractères
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(id);
}

async function check_admin(element,table){
    
    const foundAdmin = table.find(item => item.user === element);
    return foundAdmin
}
async function countByStatus(docs) {
    return docs.reduce((acc, doc) => {
      const status = doc.Statut;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status]++;
      return acc;
    }, {});
  }


function getData(fichier, key) {
    for (const item of fichier) {
        if (item[key]) {
            return item[key];
        }
    }
    return {path:null}; // ou une valeur par défaut appropriée
}
module.exports={
    isNotEmpty:isNotEmpty,
    check_admin:check_admin,
    isObjectsuccess:isObjectsuccess,
    generateauthenticateToken:generateauthenticateToken,
    authenticateToken:authenticateToken,
    verifierID:verifierID,
    authenticateliigiToken:authenticateliigiToken,
    auth_user_admin:auth_user_admin,
    generateliigiToken:generateliigiToken,
    countByStatus:countByStatus,
    searchProgrammes:searchProgrammes,
    getData:getData

   
   
}