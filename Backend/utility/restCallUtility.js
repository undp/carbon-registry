const axios = require("axios");
const config = require("./../config/config.json");
exports.getCall = async (req,api)=> {
  var  response;
    try {
      var token = extractToken(req);
      let config = {
        headers: { Authorization: `bearer ${token}` }
    };
      // add params to api call
      if(req.query) {
        let keys = Object.keys(req.query);
        var query = {};
        keys.forEach(key=> {
          query[key] = req.query[key];
        })
        query = { params: query };
        Object.assign(config,query);
      }
      var url = getBasePath().concat(api);
      console.log(`getCall  url - ${url}, config : ${config}`);
      response = await axios.get(url,config);
        console.log(response.data.data);
      } catch (error) {
        console.log("error ",error);
        throw error;
      }
      return response;
}
getBasePath = ()=> {
    return (config[process.env.PROFILE].apiBasePath);
}
extractToken  = (req)=> {
  if (req.headers.authorization && (req.headers.authorization.split(' ')[0]).toLowerCase() === ('Bearer').toLowerCase()) {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}
exports.setTokenToReq = (req,token)=> {
  req.headers.authorization = `bearer ${token}`;
}