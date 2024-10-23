const JWT_SECRET = "test_secret";
const Bdd_mongo_user = "";
const Bdd_mongo_pass = "";
const Port = 3000;
const JWT_Token_duration = "";
const Swagger_api_version = "1.0.0";
const Swagger_title = "API TEST";
const Swagger_description = "Modèle.";
const api_url_1 = "http://localhost:3000";
const api_url_2 = "http://localhost:3100";
const api_url_3 = "http://localhost:3005";
const api_origin = "http://localhost:" + Port;
const site_verif_doc = "http://localhost:3002";
const eligi_token = "Bearer <Token>";
const user_auth = {
  user: "",
  password: "",
};
const conf_bdd = {
  uri: "",
  auth: false,
  user: "",
  pass: "",
  authsource: "admin",
};
const data_mailer = {
  host: "",
  port: 465,
  secure: true, // true for 465, false for other ports
  name: "",

  auth: {
    user: "", // generated ethereal user
    pass: "", // generated ethereal password
  },
};

const data_default_role = [
  { Type: "ENV", Intitule: "approbation_letter" },
  { Type: "ENV", Intitule: "autorisation_letter" },
  { Type: "ECO", Intitule: "objection_letter" },
  { Type: "ECO", Intitule: "eligibilite_letter" },
];
const link_evaluation = "http://localhost:3002/verify/";
module.exports = {
  JWT_SECRET,
  Bdd_mongo_user,
  Bdd_mongo_pass,
  Port,
  JWT_Token_duration,
  Swagger_api_version,
  Swagger_title,
  Swagger_description,
  conf_bdd: conf_bdd,
  api_url_1,
  api_url_2,
  api_url_3,
  user_auth,
  api_origin: api_origin,
  site_verif_doc: site_verif_doc,
  eligi_token: eligi_token,
  data_mailer: data_mailer,
  link_evaluation: link_evaluation,
  data_default_role: data_default_role,
};
