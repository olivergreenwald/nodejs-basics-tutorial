var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  //below clears the errors after we've showed them to the user
  req.session.errors = null;
});

router.post('/submit', function(req, res, next) {
  //checks validity
  //Checks if the email is a real one
  req.check('email', 'Invalid email address').isEmail();
  //makes sure the password is at least 4 characters long and matches the "confirm character field"
  req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

//variable stores all the errors that we had during the session
  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');
});

module.exports = router;
