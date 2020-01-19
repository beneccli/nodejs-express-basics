const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const init = require('./passport');
const UsersService = require('../services/UsersService');
const GOOGLE = 1;
const FACEBOOK = 2;
const GITHUB = 4;

init();

// ** Wrapper for getting local user for each provider
const getUserFromProvider = (provider) => {
  return (accessToken, refreshToken, profile, cb) => {
    UsersService.getUserByProvider(provider, profile.id)
    .then((user) => {
      // Create user if he's signing for the first time
      if (!user) {
        return UsersService
        .createUserWithProvider(provider, profile.id, profile.displayName)
        .then((user_created) => {
          return cb(null, user_created);
        });
      }
      // Sign in already existing user
      return cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
  };
};

// ** GITHUB Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
  },
  getUserFromProvider(GITHUB)
));

// ** GOOGLE Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
  },
  getUserFromProvider(GOOGLE)
));

// ** FACEBOOK Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  getUserFromProvider(FACEBOOK)
));

module.exports = passport;
