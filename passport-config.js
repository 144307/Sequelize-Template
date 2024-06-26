const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "no user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password Incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => {
    console.log("user", user);
    done(null, user.id);
  });
  // passport.serializeUser(function (user, cb) {
  //   process.nextTick(function () {
  //     return cb(null, user.id);
  //   });
  // });

  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}
module.exports = initialize;
