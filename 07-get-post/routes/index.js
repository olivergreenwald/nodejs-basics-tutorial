var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });
});

//how to set up a parameter for the request (/test/5 --> for example)
router.get('/test/:id', function(req, res, next) {
	//uses .id for parameters because that is the one specified in the request above
  res.render('test', {output: req.params.id});
});

//post writes something in a database and then redirects to a different link
router.post('/test/submit', function(req, res, next) {
	//When you enter a number into the form on the 
	//website, it will then take you to another route
	//using that id (/test/10 --> for example)
  var id = req.body.id;
  res.redirect('/test/' + id);
});

module.exports = router;
