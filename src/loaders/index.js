(function (loaders) {

  'use strict';

  const expressLoader = require('./express');
  const connectionHandler = require('../subscribers/socket/connection');

  loaders.initExpress = async ({ expressApp }) => {
    await expressLoader.init({ app: expressApp });
    console.log('Express Intialized');
  };

  loaders.startServer = async ({ expressApp }) => {
    return expressApp.listen(process.env.PORT, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Your server is ready !`);
    });
  };

  loaders.initSocket = async (server) => {
    const io = require('socket.io')(server);
    io.on('connection', connectionHandler);
    return server;
  };

})(module.exports);
