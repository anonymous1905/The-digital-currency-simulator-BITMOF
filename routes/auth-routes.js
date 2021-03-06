const express = require('express');
const bcrypt = require('bcrypt');

const passport = require('passport');
const UserModel = require('../models/user-model.js');


const router = express.Router();


// REGISTRATION ----------------------------------------------------------------
router.get('/signup', (req, res, next) => {
  res.render('auth-views/signup-view.ejs');
  // Redirect to home you are already logged in.
  // if (req.user) {
  //   res.redirect('/');
  // }
  //
  // // If not logged in, show the sign up page.
  // // else {
  // }
});
console.log('1');

router.post('/signup', (req, res, next) => {

    // Check if username or password are empty.

    if (req.body.signupUsername === '' || req.body.signupPassword === '') {
      res.locals.messageForDumbUsers = 'Please provide both username and password.';

        //display Error

      res.render('bitmof/index.ejs');
      return;
    }

    // Otherwise check to see if the submitted username is taken.
    UserModel.findOne(
      { username: req.body.signupUsername },

      (err, userFromDb) => {
          if (err) {
            next(err);
            return;
          }
          console.log('2');
          // If the username is not taken, the "userFromDb" variable will be empty.

          // Check if "userFromDb" is not empty
          if (userFromDb) {

            // If that's the case, display an error to the user.

            res.locals.messageForDumbUsers = 'Sorry but that username is taken.';
            res.render('auth-views/signup-view.ejs');
            return;
          }

          // If we get here, we are ready to save the new user in the DB.
          const salt = bcrypt.genSaltSync(10);
          const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

          const theUser = new UserModel({
            fullName: req.body.signupFullName,
            username: req.body.signupUsername,
            encryptedPassword: scrambledPassword
          });



          theUser.save((err) => {
              if (err) {
                next(err);
                return;
              }
              // Redirect to home if registration is SUCCESSFUL
              res.redirect('/');
          });
      }
    );
});
// END REGISTRATION ------------------------------------------------------------





// LOG IN ----------------------------------------------------------------------

router.get('/login', (req, res, next) => {
  res.render('auth-views/login-views.ejs');
  // Redirect to home you are already logged in.
  // if (req.user) {
  // res.redirect('/bitmof');
  // }

  // If not logged in, show the log in page.
  // else {
  // }
});

router.post('/login',
  passport.authenticate(
      'local',  // 1st argument -> name of the strategy
                //                 (determined by the strategy's npm package)
      {         // 2nd argument -> settings object
        successRedirect: '/bitmof',     // "successRedirect" (where to go if login worked)
        failureRedirect: '/login' // "failureRedirect" (where to go if login failed)
      }
  )
);
// END LOG IN ------------------------------------------------------------------



router.get('/logout', (req, res, next) => {
    // the "req.logout()" function is defined by the passport middleware (app.js)
    req.logout();
    res.redirect('/');
});




// SOCIAL LOGINS ---------------------------------------------------------------
                                  // determined by the strategy's npm package
                                  //                    |
router.get('/auth/facebook', passport.authenticate('facebook'));
          //        |
          // GO HERE to login with Facebook


// When you come back from Facebook you go THERE
//                                           |
//                   -------------------------
//                   |
router.get('/auth/facebook/callback',
  passport.authenticate(
     'facebook',  // 1st argument -> name of the strategy
      {           // 2nd argument -> settings object
        successRedirect: '/bitmof',
        failureRedirect: '/login'
      }
  )
);



router.get('/auth/google',
        //        |
        // GO HERE to login with Google
  passport.authenticate(
      'google',   // determined by the strategy's npm package
      {
        scope: [
          'https://www.googleapis.com/auth/plus.login',
          'https://www.googleapis.com/auth/plus.profile.emails.read'
        ]
      }
  )
);


// When you come back from Google you go THERE
//                                           |
//                   -------------------------
//                   |
router.get('/auth/google/callback',
  passport.authenticate(
      'google',  // 1st argument -> name of the strategy
      {          // 2nd argument -> settings object
        successRedirect: '/bitmof',
        failureRedirect: '/login'
      }
  )
);

// END SOCIAL LOGINS -----------------------------------------------------------



module.exports = router;
