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

    // *** config *** //
    await loaders.init({ expressApp: app });

    app.listen(process.env.PORT, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Your server is ready !`);
    });
  }

  startServer();

  module.exports = app;

}());
