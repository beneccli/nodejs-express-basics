const expressLoader = require('./express')
// import mongooseLoader from './mongoose';

const loaders = async ({ expressApp }) => {

    // const mongoConnection = await mongooseLoader();
    // console.log('MongoDB Intialized');

    await expressLoader({ app: expressApp });
    console.log('Express Intialized');

}

module.exports = loaders;
