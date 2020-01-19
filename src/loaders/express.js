(function (expressLoader) {

  'use strict';

  // *** dependencies *** //
  const bodyParser = require('body-parser');
  const cookieParser = require('cookie-parser');
  const morgan = require('morgan')('dev');
  // const session = require('express-session');
  const routeConfig = require('../config/routes');
  const passport = require('passport');
  const { errors } = require('celebrate');

  expressLoader.init = async ({ app }) => {

    // *** healt check *** //
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });

    // *** config *** //
    app.use(morgan);
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(session({
    //   secret: process.env.SECRET_KEY,
    //   resave: false,
    //   saveUninitialized: true
    // }));
    app.use(passport.initialize());
    // app.use(passport.session());

    routeConfig.init(app);

    app.use(errors());

    return app;
  };

})(module.exports);
