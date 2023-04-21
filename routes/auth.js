const router = require("express").Router();
const passport = require("passport");
const { ensureAuthenticated } = require("../utils/auth");

router.get("/current", ensureAuthenticated, (req, res) => {
  return res.send(req.user);
});

router.get("/azureadoauth2", passport.authenticate("azure"));

router.get(
  "/azureadoauth2/callback",
  passport.authenticate("azure", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    // set cookie connect.sid

    res.cookie("connect.sid", req.sessionID, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: false,
    });

    res.redirect("http://localhost:5173/redirect");
  }
);

router.get("/logout", (req, res) => {
  // req.logout();
  req.session.destroy();
  res.clearCookie("connect.sid");
  return res.send({
    message: "Logout successful",
  });
});

router.use((req, res, next) => {
  const url = req.originalUrl;
  return res.send({ url });
});

module.exports.authRouter = router;
