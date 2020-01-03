(function (expressLoader) {

  'use strict';

  // *** dependencies *** //
  const bodyParser = require('body-parser');
  const routeConfig = require('../config/route-config.js');

  expressLoader.init = async ({ app }) => {

    // *** healt check *** //
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });

    // *** config *** //
    app.use(require('morgan')('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));

    routeConfig.init(app);

    return app;
  };

})(module.exports);
