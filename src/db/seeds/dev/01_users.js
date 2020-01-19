const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del();
  // .then(() => {
  //   return knex('users').insert([
  //   {
  //     id: 1,
  //     email: 'admin@example.com',
  //     first_name: 'admin',
  //     last_name: 'yes',
  //     admin: true
  //   }, {
  //     id: 2,
  //     email: 'user@example.com',
  //     first_name: 'user',
  //     last_name: 'no',
  //     admin: false
  //   }]);
  // });
};
