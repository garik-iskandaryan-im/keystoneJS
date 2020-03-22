require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const initialiseData = require('./initial-data');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');

//models
const userModel = require('./models/user');
const skillModel = require('./models/skill');


const keystone = new Keystone({
  name: process.env.PROJECT_NAME,
  adapter: new Adapter({
    dropDatabase: true,
    knexOptions: {
      connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
    },
  }),
  onConnect: initialiseData,
});

keystone.createList('User', userModel);
keystone.createList('Skill', skillModel);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin,
    }),
  ],
};
