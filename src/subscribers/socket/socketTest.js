(function (socketClient) {

  'use strict';

  const { localEvents, isTarget } = require('../local/localEvents');

  socketClient.init = (client, user) => {

    localEvents.on('message', (data) => {
      if (isTarget(user, data)) {
        // Do whatever is needed, like emit a message to the client itself... e.g. client.emit('messageFrom', data.message)
        console.log(data);
      }
    });

    return client;
  };

})(module.exports);
