
exports.seed = function(knex) {
  return knex('oauth_providers').del()
    .then(() => {
      return knex('oauth_providers').insert([
        { id: 1, name: 'google' },
        { id: 2, name: 'facebook' },
        { id: 3, name: 'twitter' },
        { id: 4, name: 'github' }
      ]);
    });
};
