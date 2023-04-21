const router = require('express').Router();
const passport = require('passport');
const { ensureAuthenticated } = require('../utils/auth');

router.get('/current', ensureAuthenticated, (req, res) => {
  return res.send(req.user);
});

router.get('/azureadoauth2',
  passport.authenticate('azure'));

router.get('/azureadoauth2/callback',
  passport.authenticate('azure', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.

    res.redirect("back");
  });

router.use((req, res, next) => {
  const url = req.originalUrl;
  return res.send({ url });
});

module.exports.authRouter = router;