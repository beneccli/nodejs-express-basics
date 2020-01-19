(function (UsersSchemas) {

  'use strict';

  // *** dependencies *** //
  const { celebrate, Joi, Segments } = require('celebrate');

  UsersSchemas.register = celebrate({
    [Segments.BODY]: {
      username: Joi.string().min(6).max(32).required(),
      password: Joi.string().min(6).max(32).required()
    }
  });

  UsersSchemas.login = celebrate({
    [Segments.BODY]: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  });

})(module.exports);
