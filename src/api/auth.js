const express = require('express');
const router = express.Router();
const passportSocial = require('../auth/social');
const login_required = require('../auth/strategies').authenticate('jwt', { session: false });
const jwt = require('jsonwebtoken');

const auth_from = (provider) => { return passportSocial.authenticate(provider, { failureRedirect: '/auth/signin' }) };
const create_session = (req, res) => {
  // Generate jwt token
  let jwtSplit = jwt.sign(req.user, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION }).split('.');
  // Create javascript readable cookie containing head + payload 
  res.cookie('jwt', `${jwtSplit[0]}.${jwtSplit[1]}`);
  // Create javascript unreadable cookie containing signature
  res.cookie('jwt-secure', jwtSplit[2], { httpOnly: true, secure: false /* prod: secure: true, maxAge: 10000000000, signed: true */});
  // Redirect user to home page
  res.redirect('/');
};

router.get('/github', passportSocial.authenticate('github'));
router.get('/github/callback', auth_from('github'), create_session);
router.get('/google', passportSocial.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', auth_from('google'), create_session);
router.get('/facebook', passportSocial.authenticate('facebook'));
router.get('/facebook/callback', auth_from('facebook'), create_session);

router.post('/signout', login_required, (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('jwt-secure');
  res.status(200).send();
});

router.get('/signout', (req, res) => {
  res.clearCookie('jwt');
  res.clearCookie('jwt-secure');
  res.redirect('/');
});

router.get('/signin',
  function (req, res) {
    let welcome = (req.user) ? `Hello ${req.user.username}!` : 'Hello visitor!';
    let sign_github = (req.user) ? `Sign out` : 'Sign in with GitHub';
    let sign_google = (req.user) ? `Sign out` : 'Sign in with Google';
    let sign_facebook = (req.user) ? `Sign out` : 'Sign in with Facebook';

    res.send(`
      <!doctype html>
      <html lang="en">
        <body>
          <style>body{background:black}</style>
          <h3 style="color:white">${welcome}</h3>
          <a href="http://127.0.0.1:3000/auth/github" style="color:white">${sign_github}</a>
          or
          <a href="http://127.0.0.1:3000/auth/google" style="color:white">${sign_google}</a>
          or
          <a href="http://127.0.0.1:3000/auth/facebook" style="color:white">${sign_facebook}</a>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
          <script>
            var socket = io.connect('http://127.0.0.1:3000');
            socket.on('connect', () => {
              socket.emit('join', '');
              socket.on('welcome', (data) => { console.log(\`Socket [welcome] \${data}\`); });
            });
          </script>
        </body>
      </html>
    `);
  }
);

module.exports = router;
