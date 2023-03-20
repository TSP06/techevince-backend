const router = require('express').Router();
const { } = require('../controllers/auth');
const passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/api/auth/login');
}

router.get('/current', ensureAuthenticated, (req, res) => {
  return res.send(req.user);
});

router.get('/azureadoauth2',
  passport.authenticate('azure'));

router.get('/azureadoauth2/callback',
  passport.authenticate('azure', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.

    res.send(req.user);
  });

router.use((req, res, next) => {
  const url = req.originalUrl;
  return res.send({ url });
});

module.exports.authRouter = router;