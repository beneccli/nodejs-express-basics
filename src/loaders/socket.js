(function (socketLoader) {

  'use strict';

  // *** dependencies *** //
  const connectionHandler = require('../subscribers/socket/connection');

  socketLoader.init = async ({ server }) => {
    const io = require('socket.io')(server);
    io.on('connection', connectionHandler);
    return server;
  };

})(module.exports);
