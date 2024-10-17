const JWT_SECRET = 'test_secret';
const Bdd_mongo_user = ""
const Bdd_mongo_pass =""
const Port = 3000
const JWT_Token_duration ="120d"
const Swagger_api_version="1.0.0"
const Swagger_title="API TEST";
const Swagger_description="Modèle."
const api_url_1="https://api.national.skyvisionafrica.com"
const api_url_2="https://api.statistique.skyvisionafrica.com"
const api_url_3="https://api.registrecarbone.skyvisionafrica.com"
const api_origin="http://localhost:"+Port
const site_verif_doc="https://carbon.gouv.ci"
const eligi_token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9mcm9udCIsImlhdCI6MTcxNTY5NTc3NiwiZXhwIjo0ODY5Mjk1Nzc2fQ.5DPErH9g56US6tbse5K4dJHIOoigBhGBgJFu-rMGJPI"
const user_auth={
    user:'roger.doffou@skyvisionafrica.com',
    password:'JRy4U39'
}
const conf_bdd ={
    uri:"mongodb://127.0.0.1:27017/carbon_register_ci_sign",
    auth:false,
    user:"Skyadmin",
    pass:"10043111Sky",
    authsource:"admin"
}
const data_mailer={
    host: "mail41.lwspanel.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    name:"mail41.lwspanel.com",
   
    auth: {
      user: 'roger.doffou@skyvisionafrica.com', // generated ethereal user
      pass: 'Foryou@2020' // generated ethereal password
    }
  }

const data_default_role =[

  {Type:"ENV",Intitule:"approbation_letter"},
  {Type:"ENV",Intitule:"autorisation_letter"},
  {Type:"ECO",Intitule:"objection_letter"},
  {Type:"ECO",Intitule:"eligibilite_letter"}
]
const link_evaluation="https://registrecarbone.ci.skyvisionafrica.com/verify/"
module.exports={
    JWT_SECRET,
    Bdd_mongo_user,
    Bdd_mongo_pass,
    Port,
    JWT_Token_duration,
    Swagger_api_version,
    Swagger_title,
    Swagger_description,
    conf_bdd:conf_bdd,
    api_url_1,
    api_url_2,
    api_url_3,
    user_auth,
    api_origin:api_origin,
    site_verif_doc:site_verif_doc,
    eligi_token :eligi_token ,
    data_mailer:data_mailer,
    link_evaluation:link_evaluation,
    data_default_role:data_default_role
}