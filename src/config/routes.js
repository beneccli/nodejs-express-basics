(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../api/index');
    const authRoutes = require('../api/auth');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/auth', authRoutes);

  };

})(module.exports);
