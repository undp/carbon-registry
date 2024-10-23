const port = 3002;
const api_url_1 = "http://localhost:3000";
const api_url_2 = "http://localhost:3100";
const api_url_3 = "http://localhost:3005";
const app_token = "Bearer YOUR TOKEN";
const eligi_token = "Bearer YOUR TOKEN";
const eligi_type_pay = "TYPE_PAIEMENT_29e95f40-7d13-43d5-a1a5-4932cc3ebbd9";
const user_example = "ENTER YOUR TOKEN";
const admin = [
  {
    user: "Admin",
    pass: "@bonjour",
  },
  {
    user: "skao",
    pass: "ok",
  },
];
const conf_bdd = {
  uri: "mongodb://127.0.0.1:27017/carbon_register_ci_landing",
  auth: false,
  user: "",
  pass: "",
  authsource: "admin",
};
const user_auth = {
  user: "",
  password: "",
};

const JWT_SECRET = "";
const JWT_Token_duration = "";
const JWT_SECRET_ELIGI = "";
const JWT_Token_ELIGI_duration = "";
const Doc_server = "http://localhost:3000";
const intern_server = "http://localhost:" + port;
const Doc_Token = "VOTRE TOKEN ICI";
const contact_sender = {
  title: "",
  sender: "",
};
const localisation_bmc = {
  title: "BMC : 430 E 6th St,Abidjan, 10009.",
  gps: [5.3340038, -4.0227503],
  contact: "+255 xxxxxxxxx",
  email: "test@register.org",
};
const logo_link = "";

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

const ia = {
  api_key: "AI BOT TOKEN",
  source: "AI BOT TOKEN",
};
module.exports = {
  port: port,
  api_url_1: api_url_1,
  api_url_2: api_url_2,
  api_url_3: api_url_3,
  user_auth: user_auth,
  app_token: app_token,
  eligi_token: eligi_token,
  eligi_type_pay: eligi_type_pay,
  admin: admin,
  conf_bdd: conf_bdd,
  JWT_SECRET: JWT_SECRET,
  JWT_SECRET_ELIGI: JWT_SECRET_ELIGI,
  JWT_Token_duration: JWT_Token_duration,
  JWT_Token_ELIGI_duration: JWT_Token_ELIGI_duration,
  user_example: user_example,
  Doc_server: Doc_server,
  Doc_Token: Doc_Token,
  contact_sender: contact_sender,
  data_mailer: data_mailer,
  localisation_bmc: localisation_bmc,
  logo_link: logo_link,
  intern_server: intern_server,
  ia: ia,
};
