//THESE ARE SUB-ROUTES

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/detail', function(req, res, next) {
  res.send('respond with a resource');
});

//localhost:8000/users/ --> it will use the first route 
//localhost:8000/users/detail --> it will use the second route
module.exports = router;
