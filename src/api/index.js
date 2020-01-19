const express = require('express');
const router = express.Router();
const { localEvents } = require('../subscribers/local/localEvents');
const usersService = require('../services/UsersService');
const passport = require('../auth/strategies');
const loginRequired = passport.authenticate('jwt', { session: false });

router.get('/',
  passport.authenticate('jwt', { session: false, failureRedirect: '/visitor' }),
  (req, res) => {
    res.send(`<h3>Hello ${req.user.username}</h3><a href="/auth/signout">Sign out</a>`);
  });

router.get('/visitor', (req, res) => {
  res.send('<h3>Hello visitor !</h3><a href="/auth/signin">Sign in</a>');
});

router.get('/users', (req, res, next) => {
  let users = usersService.getAll()
  .then((result) => {
    res.json({
      page: 'users',
      content: result
    });
  })
  .catch((err) => {
    res.status(400).json({ page: 'users', status: err });
  });
});

router.get('/jwt',
  loginRequired,
  function (req, res) {
    res.json({
      page: 'jwt',
      user: req.user
    });
  });

router.get('/event',
  loginRequired,
  function (req, res) {
    localEvents.emit('message', {
      target: { type: 'users', data: [1,2] },
      message: `Hello ${req.user.username}! ;)`
    });
    res.json({ page: 'event', user: req.user.username });
  });

module.exports = router;
