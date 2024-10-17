const { default: axios } = require("axios");
const _default = require("../setting/default");

const _function = require("./function");
const { authorize } = require("passport");


class api {
    constructor(){

    }


    async auth_user(Email,Password){
      try {
        const response = await axios.post(_default.api_url_3+'/users/apiv1/connexionOrganisation', {
          Email_admin_organisation: Email,
          Mot_de_passe_temporaire_admin:Password,
           
          },{
            headers:{
              authorization:_default.eligi_token
            }
          });
        
          return response.data;
      } catch (error) {
        console.error('Error posting data:', error);
        return {error:true}
      }
    }
   async create_organisation(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/creatOrganisation', data,{
          headers:{
            authorization:_default.eligi_token,
            ...data.getHeaders()
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async create_paiement(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/creatPaiement', data,{
          headers:{
            authorization:_default.eligi_token,
            ...data.getHeaders()
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async create_note(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/creatNote_idee', data,{
          headers:{
            authorization:_default.eligi_token,
            ...data.getHeaders()
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async update_note(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/editNote_idee', data,{
          headers:{
            authorization:_default.eligi_token,
            ...data.getHeaders()
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async update_note_json(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/editNote_idee', data,{
          headers:{
            authorization:_default.eligi_token,
        
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async update_orga_pass(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/editEmail', data,{
          headers:{
            authorization:_default.eligi_token,
        
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async update_orga(data){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/editOrganisation', data,{
          headers:{
            authorization:_default.eligi_token,
            ...data.getHeaders()
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async get_organisation(id){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/listOrganisationbyref', {
        Ref_organisation: id,

         
        },{
          headers:{
            authorization:_default.eligi_token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async get_organisation_ideas(id){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/listNote_idee_by_organisation', {
        Id_organisation: id,

         
        },{
          headers:{
            authorization:_default.eligi_token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async get_idea(id){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/listNote_idee_by_ref', {
        Ref_note_idee: id,

         
        },{
          headers:{
            authorization:_default.eligi_token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
   async get_pay(id){
    try {
      const response = await axios.post(_default.api_url_3+'/users/apiv1/listPaiementby_ref_paiement', {
        Ref_paiement: id,

         
        },{
          headers:{
            authorization:_default.eligi_token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
   }
}

class doc_api {
  constructor(){

  }
  async _read(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/read',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _user_login(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/login',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _user_read(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/read',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _user_create(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/create',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _user_update(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/update',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _user_delete(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/delete',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _user_active(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/active',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_read(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/read',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _role_create(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/role/create',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _role_update(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/role/update',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _role_delete(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/role/delete',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _role_read(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/role/read',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_sign(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/sign_auto',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_stat(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/user/stat',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_ask_auth(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/ask_auth',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }

  async _doc_sign_auto(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/sign_auto',data,{
          headers:{
            authorization:_default.Doc_Token,
               ...data.getHeaders(),
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_sign_file(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/add_doc_sign',data,{
          headers:{
            authorization:_default.Doc_Token,
            ...data.getHeaders(),
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_sign_auto_json(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/sign_auto',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
  async _doc_sign_file_json(data){
    try {
      const response = await axios.post(_default.Doc_server+'/api/v1/doc/add_doc_sign',data,{
          headers:{
            authorization:_default.Doc_Token
          }
        });
      
        return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      return {error:true}
    }
  }
}
module.exports={
    api:api,
    doc_api:doc_api
}