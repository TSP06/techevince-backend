const AzureStrategy = require("passport-azure-ad-oauth2").Strategy;
const { User } = require("../model");

const azureStrategy = new AzureStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    resource: process.env.RESOURCE,
    tenant: process.env.TENANT,
    scope: process.env.SCOPE,
  },
  async (accessToken, refreshToken, params, profile, done) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          name: profile.displayName,
          rollno: profile._json.rollno,
          email: profile.emails[0].value,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        await newUser.save();
        done(null, newUser);
      }
    } catch (err) {
      done(err, null);
    }
  }
);

module.exports = azureStrategy;