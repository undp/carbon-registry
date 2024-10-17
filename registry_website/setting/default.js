const port =3002
const api_url_1="https://api.national.skyvisionafrica.com"
const api_url_2="https://api.statistique.skyvisionafrica.com"
const api_url_3="https://api.registrecarbone.skyvisionafrica.com"
const app_token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbiI6IlJlZ2lvbiBkZXMgbGFndW5lcyIsIm4iOiJSb290Iiwic3ViIjo2LCJyIjoiUm9vdCIsImNpZCI6NywiY3IiOiJHb3Zlcm5tZW50IiwicyI6MSwiaWF0IjoxNzE0OTcxNzA5LCJleHAiOjE3MTQ5Nzg5MDl9.VUaQ8OAOeBoNh18h-LGp0oTJrCdIqvUeEZv1SKk3v0U"
const eligi_token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnRpdHVsZSI6InN5c3RlbV9mcm9udCIsImlhdCI6MTcxNTY5NTc3NiwiZXhwIjo0ODY5Mjk1Nzc2fQ.5DPErH9g56US6tbse5K4dJHIOoigBhGBgJFu-rMGJPI"
const eligi_type_pay="TYPE_PAIEMENT_29e95f40-7d13-43d5-a1a5-4932cc3ebbd9"
const user_example="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IkZpY2hpZXIiOlt7IkRGRSI6eyJmaWVsZG5hbWUiOiJERkUiLCJvcmlnaW5hbG5hbWUiOiJ0ZW1wLTE3MTYxNzg3NzgzODctbWFudWFsLnBkZiIsImVuY29kaW5nIjoiN2JpdCIsIm1pbWV0eXBlIjoiYXBwbGljYXRpb24vcGRmIiwiZGVzdGluYXRpb24iOiJ1cGxvYWRzIiwiZmlsZW5hbWUiOiJjYXJib25fcmVnaXN0ZXJfLTYwYTFjYWI1LTczMzgtNDBlZC04NjY3LTE4NjIzYjBkZWMzOHRlbXAtMTcxNjE3ODc3ODM4Ny1tYW51YWwucGRmIiwicGF0aCI6InVwbG9hZHMvY2FyYm9uX3JlZ2lzdGVyXy02MGExY2FiNS03MzM4LTQwZWQtODY2Ny0xODYyM2IwZGVjMzh0ZW1wLTE3MTYxNzg3NzgzODctbWFudWFsLnBkZiIsInNpemUiOjEwOTA4MDR9fSx7IlJDQ00iOnsiZmllbGRuYW1lIjoiUkNDTSIsIm9yaWdpbmFsbmFtZSI6InRlbXAtMTcxNjE3ODc3ODQyMC1tYW51YWwucGRmIiwiZW5jb2RpbmciOiI3Yml0IiwibWltZXR5cGUiOiJhcHBsaWNhdGlvbi9wZGYiLCJkZXN0aW5hdGlvbiI6InVwbG9hZHMiLCJmaWxlbmFtZSI6ImNhcmJvbl9yZWdpc3Rlcl8tN2Y5NTFkY2UtMDExNi00NjU1LThmNmQtN2UyMDYwZmI0ZDZidGVtcC0xNzE2MTc4Nzc4NDIwLW1hbnVhbC5wZGYiLCJwYXRoIjoidXBsb2Fkcy9jYXJib25fcmVnaXN0ZXJfLTdmOTUxZGNlLTAxMTYtNDY1NS04ZjZkLTdlMjA2MGZiNGQ2YnRlbXAtMTcxNjE3ODc3ODQyMC1tYW51YWwucGRmIiwic2l6ZSI6MTA5MDgwNH19LHsiTG9nb19vcmdhbmlzYXRpb24iOnsiZmllbGRuYW1lIjoiTG9nb19vcmdhbmlzYXRpb24iLCJvcmlnaW5hbG5hbWUiOiJ0ZW1wLTE3MTYxNzg3NzgzODEtR3JvdXAgMzkyOTQucG5nIiwiZW5jb2RpbmciOiI3Yml0IiwibWltZXR5cGUiOiJpbWFnZS9wbmciLCJkZXN0aW5hdGlvbiI6InVwbG9hZHMiLCJmaWxlbmFtZSI6ImNhcmJvbl9yZWdpc3Rlcl8tY2M2ZDkxMWQtMWFiMC00MWRiLTlmZTEtNTMwNGRmNzMwZWFhdGVtcC0xNzE2MTc4Nzc4MzgxLUdyb3VwMzkyOTQucG5nIiwicGF0aCI6InVwbG9hZHMvY2FyYm9uX3JlZ2lzdGVyXy1jYzZkOTExZC0xYWIwLTQxZGItOWZlMS01MzA0ZGY3MzBlYWF0ZW1wLTE3MTYxNzg3NzgzODEtR3JvdXAzOTI5NC5wbmciLCJzaXplIjoxMjA2MDl9fV0sIl9pZCI6IjY2NGFjZjVmMDc3NzA2YTE5ZjY5Yzk5NiIsIkRhdGVfc3lzdGVtIjoiMjAyNC0wNS0yMFQwNDoxOTo0My4yODdaIiwiUmVmX29yZ2FuaXNhdGlvbiI6IlNPVU1JU1NJT05OQUlSRV9jNjc1YTA4Mi0xYjFiLTQwYzYtYmVkMi1kODFjMjkxZTFhY2QiLCJEZW5vbWluYXRpb25fb3JnYW5pc2F0aW9uIjoib2xpdmUiLCJTaXRlX3dlYl9vcmdhbmlzYXRpb24iOiJodHRwczovL3NreXZpc2lvbmFmcmljYS5jb20iLCJFbWFpbF9vcmdhbmlzYXRpb24iOiJzdWluaW9saXZlNThAZ21haWwuY29tIiwiTnVtZXJvX3RlbF9vcmdhbmlzYXRpb24iOiIwNzU4MDQ4MTU1IiwiRW1haWxfYWRtaW5fb3JnYW5pc2F0aW9uIjoic3VpbmlvbGl2ZTU4QGdtYWlsLmNvbSIsIk51bWVyb190ZWxfYWRtaW5fb3JnYW5pc2F0aW9uIjoiMDc1ODA0ODE1NSIsIlN0YXR1dF9vcmdhbmlzYXRpb24iOiJzb3VtaXNzaW9ubmV1ciIsIk1vdF9kZV9wYXNzZV90ZW1wb3JhaXJlX2FkbWluIjoiYzY3NWEwODItMWIxYi00MGM2LWJlZDItZDgxYzI5MWUxYWNkIiwiRGF0ZV9jcmVhdGlvbiI6IjIwMjQtMDUtMjBUMDQ6MTk6NDMuMjg3WiIsIl9fdiI6MH0sImlhdCI6MTcxNjIzMzQxMiwiZXhwIjoxNzI2NjAxNDEyfQ.aQBYPCdn4x3SWWhy2qhH_nSYu8wN8aeuBXF3WkEP3v4"
const admin =[
    {
        user:"Admin",
        pass:"@bonjour"
    },
    {
        user:"skao",
        pass:"ok"
    }
]
const conf_bdd ={
    uri:"mongodb://127.0.0.1:27017/carbon_register_ci_landing",
    auth:false,
    user:"Skyadmin",
    pass:"10043111Sky",
    authsource:"admin"
}
const user_auth={
    user:'roger.doffou@skyvisionafrica.com',
    password:'JRy4U39'
}

const JWT_SECRET="myregister@2024" 
const JWT_Token_duration="120d"
const JWT_SECRET_ELIGI="eligi@2024" 
const JWT_Token_ELIGI_duration="20d"
const Doc_server="http://localhost:3000"
const intern_server="http://localhost:"+port
const Doc_Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3RpbmciLCJpYXQiOjE3MTgyNDI0MjMsImV4cCI6MTcyODYxMDQyM30.XuQu4Rmw96ViifitrxXkBkb34gduYNVnsvhmDaISgfI"
const contact_sender = {
    title:"Registre carbone Côte d'Ivoire <roger.doffou@skyvisionafrica.com>",
    sender:'olive.suini@skyvisionafrica.com'
}
const localisation_bmc ={
    title:'BMC : 430 E 6th St,Abidjan, 10009.',
    gps:[5.3340038, -4.0227503],
    contact:"+255 xxxxxxxxx",
    email:"test@register.org"
  
}
const logo_link ="https://registrecarbone.ci.skyvisionafrica.com/ext/logo/logos.png"

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

const ia = {
    api_key:"sec_4gIIHx0AL8g1FuZFStmpmsyD6ukXLh6N",
    source:"src_BahSpPg7Abo36XSK7384t",
}
module.exports={
    port:port,
    api_url_1:api_url_1,
    api_url_2:api_url_2,
    api_url_3:api_url_3,
    user_auth:user_auth,
    app_token:app_token,
    eligi_token:eligi_token,
    eligi_type_pay:eligi_type_pay,
    admin:admin,
    conf_bdd:conf_bdd,
    JWT_SECRET:JWT_SECRET,
    JWT_SECRET_ELIGI:JWT_SECRET_ELIGI,
    JWT_Token_duration:JWT_Token_duration,
    JWT_Token_ELIGI_duration: JWT_Token_ELIGI_duration,
    user_example:user_example,
    Doc_server:Doc_server,
    Doc_Token:Doc_Token,
    contact_sender:contact_sender,
    data_mailer:data_mailer,
    localisation_bmc:localisation_bmc,
    logo_link:logo_link,
    intern_server:intern_server,
    ia:ia,
    
}
