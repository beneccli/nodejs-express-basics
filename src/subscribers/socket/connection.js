
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const { socketSubscribers } = require('../../config/subscribers');

const connectionHandler = (client) => {
  console.log('Socket [connection]');

  // ** Initialize user
  let user = null;
  const cookies = cookie.parse(client.request.headers.cookie);
  const jsonwebtoken = (cookies.jwt && cookies['jwt-secure']) ? `${cookies.jwt}.${cookies['jwt-secure']}` : null;
  jwt.verify(jsonwebtoken, process.env.SECRET_KEY, (err, decoded) => { user = decoded; });

  // ** Initialize events handlers
  if (user) {
    client.emit('welcome', `Hello ${user.username} !`);

    for (let sub of socketSubscribers)
      require(sub).init(client, user);
  }
  // ** JWT is not authorized
  else
    client.disconnect();
};

module.exports = connectionHandler;
