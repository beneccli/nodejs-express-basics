
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile.js')[environment];
const database = require('knex')(configuration);

module.exports = database;
