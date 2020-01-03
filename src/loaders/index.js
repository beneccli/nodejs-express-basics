(function (loaders) {

  'use strict';

  const expressLoader = require('./express');
  // import mongooseLoader from './mongoose';

  loaders.init = async ({ expressApp }) => {

    // const mongoConnection = await mongooseLoader();
    // console.log('MongoDB Intialized');

    await expressLoader.init({ app: expressApp });
    console.log('Express Intialized');

  };

})(module.exports);
