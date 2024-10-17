const { default: axios } = require("axios");
const _default = require("../../settings/default");

const _function = require("../function_intern/function");
user = require("../../settings/default");
user = _default.user_auth

class api {
    constructor(){

    }

    async waiting(name,email,tel,country){

        try {
            const response = await axios.post(_default.api_url_1+'/api/v1/waiting/create', {
                name: name,
                email: email,
                tel:tel,
                country:country
              }, {
                headers: {
                  auth_app:_default.app_token
                }
              });
            
              return response.data;
          } catch (error) {
            console.error('Error posting data:', error);
            throw error;
          }
        
    }
    async auth_register(){
      try {
        const response = await axios.post(_default.api_url_1+'/national/auth/login', {
          username: user.user,
          password:user.password,
           
          });
        
          return response.data;
      } catch (error) {
        console.error('Error posting data:', error);
        return {error:true}
      }
    }
    async projet_list(page,size,req){
      try {
        const response = await axios.post(_default.api_url_1+'/national/programme/query', {
          page: page,
          size: size,
           
          }, {
            headers: {
              authorization:"Bearer "+req.session.register_token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {
         
          let info = await this.auth_register()
          console.log("A")
          if(_function.isNotEmpty(info.access_token)){
              req.session.register_token=info.access_token
              console.log("R")
              return {error:true,load:true}
          }else{
              return {error:true,load:false}
          }
      }
    }
    async orga_list(page,size,req){
      try {
        const response = await axios.post(_default.api_url_1+'/national/organisation/query', {
          page: page,
          size: size,
           
          }, {
            headers: {
              authorization:"Bearer "+req.session.register_token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {
         
          let info = await this.auth_register()
          console.log("A")
          if(_function.isNotEmpty(info.access_token)){
              req.session.register_token=info.access_token
              console.log("R")
              return {error:true,load:true}
          }else{
              return {error:true,load:false}
          }
      }
    }
    async single_orga(id,token){
      try {
        const response = await axios.post(_default.api_url_1+'/national/organisation/findByIds', {
          companyIds: [
            id
          ]
           
          }, {
            headers: {
              authorization:"Bearer "+token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {
         
              return {error:true,load:false}
        
      }
    }
    async single_orga2(ids,req){
      try {
        const response = await axios.post(_default.api_url_1+'/national/organisation/findByIds', {
          companyIds: ids
           
          }, {
            headers: {
              authorization:"Bearer "+req.session.register_token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {
         console.log(error)
          let info = await this.auth_register()
          console.log("A")
          if(_function.isNotEmpty(info.access_token)){
              req.session.register_token=info.access_token
              console.log("R")
              return {error:true,load:true}
          }else{
              return {error:true,load:false}
          }
      }
    }
    async single_projet(id,token){
      try {
        const response = await axios.post(_default.api_url_1+'/national/programme/query', {
          page: 1,
          size: 2,
          filterAnd: [
            {
              key: 'programmeId',
              operation: '=',
              value: id,
            },
          ],
           
          }, {
            headers: {
              authorization:"Bearer "+token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {

          
              return {error:true,load:false}
         
      }
    }
    async autorise_itmo(id,token){
      try {
        const response = await axios.post(_default.api_url_1+'/national/programme/authorize', 
          {
            programmeId:id,
            issueAmount:Number('0'),
            comment:''
          }
          , {
            headers: {
              authorization:"Bearer "+token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {

          
              return {error:true,load:false}
         
      }
    }
    async list_ndc(id,page,size,req){
      try {
        const response = await axios.post(_default.api_url_1+'/national/programme/queryNdcActions', {
          page: page,
          size: size,
          filterAnd: [
            {
              key: 'programmeId',
              operation: '=',
              value: id,
            },
          ],
           
          }, {
            headers: {
              authorization:"Bearer "+req.session.register_token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {

          let info = await this.auth_register()
          console.log("A")
          if(_function.isNotEmpty(info.access_token)){
              req.session.register_token=info.access_token
              console.log("R")
              return {error:true,load:true}
          }else{
              return {error:true,load:false}
          }
      }
    }
    async list_global_ndc(page,size,req){
      try {
        const response = await axios.post(_default.api_url_1+'/national/programme/queryNdcActions', {
          page: page,
          size: size,
          filterAnd: [
            {
              key: 'status',
              operation: '=',
              value: "Approved",
            },
          ],
          }, {
            headers: {
              authorization:"Bearer "+req.session.register_token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {

          let info = await this.auth_register()
          console.log("A")
          if(_function.isNotEmpty(info.access_token)){
              req.session.register_token=info.access_token
              console.log("R")
              return {error:true,load:true}
          }else{
              return {error:true,load:false}
          }
      }
    }
    async statistic(req){
      try {
        const response = await axios.post(_default.api_url_2+'/stats/programme/agg', {
          stats: [
            {
              type: "AGG_PROGRAMME_BY_STATUS",
              statFilter: {
                onlyMine: false
               
              }
              
              }
              
          ],
          category_type:"overall",
          system: "CARBON_REGISTRY_SYSTEM"
           
          }, {
            headers: {
              authorization:"Bearer "+req.session.register_token
            }
          });
   
          return {error:false,list:response.data} 
      } catch (error) {
         console.log(error)
          let info = await this.auth_register()
          console.log("A")
          if(_function.isNotEmpty(info.access_token)){
              req.session.register_token=info.access_token
              console.log("R")
              return {error:true,load:true}
          }else{
              return {error:true,load:false}
          }
      }
    }

    async idea_get_organisation(id){
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
     async idea_get_organisation_ideas(id){
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
     async idea_get_idea(id){
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
     async idea_get_pay(id){
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
     async idea_update(data){
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
}

module.exports={
    api:api
}