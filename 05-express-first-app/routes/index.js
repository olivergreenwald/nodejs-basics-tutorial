//THESE ARE SUB-ROUTES

var express = require('express');
var router = express.Router();

/* GET home page. */
//for the / --> we get this route
router.get('/', function(req, res, next) {
	//rendering file and displaying text
	//You can change the "Express" to change the title of the page
  res.render('index', { title: 'Express', condition: true });
});

module.exports = router;
