(function() {

  'use strict';

  // *** dependencies *** //
  const loaders = require('./loaders');
  const express = require('express');
  const dotenv = require('dotenv');

  // *** init *** //
  dotenv.config();
  const app = express();

  async function startServer() {
    await loaders.initExpress({ expressApp: app });
    var server = await loaders.startServer({ expressApp: app });
    loaders.initSocket(server);
  }

  startServer();

  module.exports = app;

}());
