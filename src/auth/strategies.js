const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;

const init = require('./passport');

init();

// ** JWT Strategy
const cookieExtractor = (req) => {
  if (req) {
    const jwt = req.cookies.jwt; // Head + Payload
    const jwtSecure = req.cookies['jwt-secure']; // Signature
    if (jwt && jwtSecure)
      return `${jwt}.${jwtSecure}`;
  }
  return null;
};
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor, ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: process.env.SECRET_KEY
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';
};
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  if (!jwt_payload) return done(null, false);
  return done(null, jwt_payload);
}));

module.exports = passport;
