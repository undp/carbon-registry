var createResponse = function(statusCode,message,data) {
    var response = {};
  
    response.statusCode = statusCode;
    response.message = message;
    response.data = data;
    return response;
  }
  function sendResponse(res,statusCode,message,data) {
    return res.status(statusCode).json(createResponse(statusCode,message,data));
  }

  module.exports = sendResponse;