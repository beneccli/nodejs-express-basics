(function (UsersService) {

  'use strict';

  const knex = require('../db/connection');
  // const uuidv4 = require('uuid/v4');

  UsersService.getAll = () => {
    return knex('users');
  };

  UsersService.getUserByProvider = async (provider_id, provider_user_id) => {
    return knex
    .from('oauth_providers_users')
    .where('oauth_providers_users.provider_user_id', provider_user_id)
    .andWhere('oauth_providers_users.provider_id', provider_id)
    .innerJoin('users', 'users.id', 'oauth_providers_users.user_id')
    .select('users.id', 'email', 'username', 'picture', 'admin')
    .first();
  };

  UsersService.createUserWithProvider = async (provider_id, provider_user_id, displayName) => {
    return knex.transaction(function (t) {
      return knex('users')
        .transacting(t)
        .insert({ username: displayName, admin: false, email: null })
        .returning('*')
        .then((users) => {
          if (users.length)
            return knex('oauth_providers_users')
              .transacting(t)
              .insert({ provider_id: provider_id, provider_user_id: provider_user_id, user_id: users[0].id })
              .then(() => { return users[0]; });
          else
            throw new Error('No user has been created.');
        });
    });
  };

})(module.exports);
