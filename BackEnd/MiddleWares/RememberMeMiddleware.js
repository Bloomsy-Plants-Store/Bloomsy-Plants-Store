const passport = require('passport');

function authenticate(req, res, next) {
  passport.authenticate('remember-me', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return next();
    });
  })(req, res, next);
}

module.exports = { authenticate };
