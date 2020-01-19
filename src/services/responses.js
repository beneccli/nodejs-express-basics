(function (response) {

  'use strict';

  response.error = (res, statusCode, statusText, message, code) => {
    // The response is filtered to avoid having any 'null' inside 
    let response = Object.fromEntries(Object.entries({
      statusCode: statusCode,
      error: statusText,
      code: code,
      message: message
    }).filter(([k,v]) => v !== null));

    res.status(statusCode).json(response);
  };

  response.unauthorized = (res, message = null, code = null) => {
    response.error(res, 401, 'Unauthorized', message, code);
  };

  response.notFound = (res, message = null, code = null) => {
    response.error(res, 404, 'Not Found', message, code);
  };

  response.conflict = (res, message = null, code = null) => {
    response.error(res, 409, 'Conflict', message, code);
  };

  response.serverError = (res, message = null, code = null) => {
    response.error(res, 500, 'Server Error', message, code);
  };

  response.ok = (res) => {
    res.status(200).send();
  };

})(module.exports);
  