const mailer = require("./mailer").mailer


class email
{
    constructor(from,to){
        this.from=from
        this.to=to
     
      
    }
    async approbation_letter(from,to,link){
        
        let subject="Lettre d'Approbation au registre carbone national"
        let html=`
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>FELICITATION</h2>
        <p>Votre projet a été approuvé avec succès.</p>
        <p>Votre lettre d'approbation a bien été signée.</p>
        <p>Vous pouvez désormais démarrer les activités de votre projet.</p>
         <p>Accédez à votre lettre en cliquant ici : 
            <a href="${link}" style="color: #aad8d3;">Voir la lettre</a>
        </p>
        
        
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>

        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async autorisation_letter(from,to,link){
 
        let subject="Lettre d'autorisation au registre carbone national"
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>FELICITATION</h2>
        <p>Votre lettre d'autorisation a bien été signée.</p>
        <p>Vous pouvez désormais réclamer les crédits carbone générés par votre projet.</p>
      
         <p>Accédez à votre lettre en cliquant ici : 
            <a href="${link}" style="color: #aad8d3;">Voir la lettre</a>
        </p>
        
        
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async objection_letter(from,to,link){
        
        let subject="Lettre de non objection au registre carbone national"
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>FELICITATION</h2>
        <p>Votre note d'idée a été jugée sans objection.</p>
        <p>Votre lettre de non objection a bien été signée.</p>
         <p>Accédez à votre lettre en cliquant ici  : 
            <a href="${link}" style="color: #aad8d3;">Voir la lettre</a>
        </p>
        <p>La prochaine étape pour vous est de soumettre votre MADD (Document Descriptif de l’Activité d’Atténuation) au bureau du marché à l'adresse suivante :  <span class="highlight">roger.doffou@skyvisionafrica.com </span> </p>
       
        <p> Afin de pouvoir enregistrer votre projet dans le registre.</p>
        
        <p>
        Vous êtes invité à vous inscrire sur le registre de la Côte d'Ivoire au lien suivant :
                    <a href="https://ci.registrecarbone.skyvisionafrica.com/registerCompany" style="color: #aad8d3;">https://ci.registrecarbone.skyvisionafrica.com/registerCompany</a> <br>

                    (Cette inscription est obligatoire pour la suite du processus.)
        <p>
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        
        
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async eligibilite_letter(from,to,link){
       
        let subject="Lettre d'éligibilité au registre carbone national"
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>FELICITATION</h2>
        <p>Votre note d'idée a été jugée éligible.</p>
        <p>Votre lettre de non-objection a bien été signée.</p>
         <p>Accédez à votre lettre en cliquant ici : 
            <a href="${link}" style="color: #aad8d3;">Voir la lettre</a>
        </p>
        <p>La prochaine étape pour vous est de soumettre votre MADD (Document Descriptif de l’Activité d’Atténuation) au bureau du marché à l'adresse suivante :  <span class="highlight">roger.doffou@skyvisionafrica.com </span> </p>
       
        <p> Afin de pouvoir enregistrer votre projet dans le registre.</p>
        
         <p>
        Vous êtes invité à vous inscrire sur le registre de la Côte d'Ivoire au lien suivant :
                    <a href="https://ci.registrecarbone.skyvisionafrica.com/registerCompany" style="color: #aad8d3;">https://ci.registrecarbone.skyvisionafrica.com/registerCompany</a> <br>

                    (Cette inscription est obligatoire pour la suite du processus.)
        <p>
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        
        
        
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async ask_account_activation(from,to,link,pass){
       
        let subject="Activation de compte de signature de document électronique du registre carbone national"
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>FELICITATION</h2>
        <p>Votre compte de signature électronique a bien été crée.</p>
         <p>Votre mot de passe temporaire : <span style="#aad8d3">${pass}</span> </p>
        <p>Cliquez en dessous pour l'activer</p>
         <p>Accédez à la zone d'activation en cliquant ici : 
            <a href="${link}" style="color: #aad8d3;">Confirmer</a>
        </p>
        <p>La prochaine étape pour vous est d'activer votre compte. Une fois activé, vous allez recevoir un mot de passe temporaire à modifier pour des questions de sécuriter. </span> </p>
       
       
        
         
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        
        
        
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async account_actived(from,to,link){
       
        let subject="Votre compte de signature du registre carbone national a bien été activé "
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>FELICITATION</h2>
        <p>Votre compte de signature électronique a bien été activé.</p>
       
        <p>Cliquez en dessous pour vous connectez à votre espace </p>
       <p> <a href="${link}" style="color: #aad8d3;">Mon espace</a> </p>
       
       
        
         
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        
        
        
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async notif_sign(from,to,link){
       
        let subject="Nouvelle demande  de signature de document électronique du registre carbone national"
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>Régistre nationnal de la Côte d'IVoire</h2>
        <p>Vous avez une nouvelle demande  de singature de document en attente.</p>
       
        
       
       
        
         
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        
        
        
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async ask_auth(from,to,pass){

        let subject="Code d'authentification de document électronique du registre carbone national"
        let html=`
         <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            background-color: #244035;
            color: white;
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 20px;
        }
        .logo {
            text-align: center;
        }
        .logo img {
            width: 150px; /* Ajustez la taille selon vos préférences */
        }
        .highlight {
            background-color: yellow;
            color: black;
            padding: 2px 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logowhite.png" alt="Logo">
        </div>
        <h2>CODE D'AUTHENTIIFICATON </h2>
        <p>Votre code de signature électronique a bien été crée.</p>
         <p>Code temporaire : <span style="#aad8d3">${pass}</span> </p>

       
       
       
        
         
        <p>Bonne réception et bonne continuation.<br>Registre Carbone National<br>République de Côte d'Ivoire</p>
    </div>
</body>
</html>
        
        
        
        `
        let _mailer = new mailer(from,to,subject,"",html)
        let info =_mailer.active_return()
       return info
    }
    async forget_account(){

    }
    async new_pass_account(){
        
    }
    async _main(Type,link,infos){
        let status=false
        let info="Error Type"
        switch (Type) {
            case "approbation_letter":
                
                info =await this.approbation_letter(this.from,this.to,link)
                status=true
               break;
            case "autorisation_letter":
                
               info =await this.autorisation_letter(this.from,this.to,link)
               status=true
               break;
            case "objection_letter":
                
               info =await this.objection_letter(this.from,this.to,link)
               status=true
               break;
            case "eligibilite_letter":
                
               info =await this.eligibilite_letter(this.from,this.to,link)
               status=true
               break;
            case "ask_account":
                info =await this.ask_account_activation(this.from,this.to,link,infos)
                status=true
               break;
            case "active_account":
                info =await this.account_actived(this.from,this.to,link)
                status=true
               break;
            case "ask_sign":
                info =await this.notif_sign(this.from,this.to,link)
                status=true
            
               break;
            case 'ask_auth':
                    info =await this.ask_auth(this.from,this.to,infos)
                    status=true
                
                break;
           
        }
        return {status:status,message:info}
    }
}
module.exports={
    email:email
}