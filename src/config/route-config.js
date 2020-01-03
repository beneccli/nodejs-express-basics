(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../api/index');

    // *** register routes *** //
    app.use('/', routes);

  };

})(module.exports);
