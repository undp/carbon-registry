const { logo_link } = require("../setting/default")

const mailer = require("./mailer").mailer


class email
{
    constructor(from,to){
        this.from=from
        this.to=to
     
      
    }
    async new_message(from,to,data){
        
        let subject="Contactez via le site officiel du registre carbone national de la Côte D'Ivoire ."
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
            <img src="${logo_link}" alt="Logo">
        </div>
        <h2>Bonjour, vous avez réçu un nouveau message via le site officiel du régistre carbone</h2>
        <p>Le contenu est le suivant : </p> <br>
        <h3> Nom et prennom </h3> <br>
         <p>
            ${data.nomprenom}
        </p>
          <h3> Email </h3> <br>
           <p>
            ${data.email}
        </p>
          <h3> Sujet </h3> <br>
           <p>
            ${data.sujet}
        </p>
          <h3> Message </h3> <br>
           <p>
            ${data.message}
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
    async user_message(from,to,data){
        
        let subject="Contactez via le site officiel du registre carbone national de la Côte D'Ivoire ."
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
            <img src="${logo_link}" alt="Logo">
        </div>
        <h2>Bonjour, Nous avons bien réçu votre message via le site officiel du régistre carbone</h2>
        <p>Le contenu est le suivant : </p> <br>
        <h3> Nom et prennom </h3> <br>
         <p>
            ${data.nomprenom}
        </p>
          <h3> Email </h3> <br>
           <p>
            ${data.email}
        </p>
          <h3> Sujet </h3> <br>
           <p>
            ${data.sujet}
        </p>
          <h3> Message </h3> <br>
           <p>
            ${data.message}
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
 
    async _main(Type,data,infos){
        let status=false
        let info="Error Type"
        switch (Type) {
            case "new_message":
                
                info =await this.new_message(this.from,this.to,data)
                status=true
               break;
          
               case "user_message":
                
               info =await this.user_message(this.from,this.to,data)
               status=true
              break;
        }
        return {status:status,message:info}
    }
}
module.exports={
    email:email
}