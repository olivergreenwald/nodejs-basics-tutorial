var express = require('express');
var router = express.Router();
//create the address or location of Mongodb as well as initializing the variale
var db = require('monk')('localhost:27017/test');
//setting the default collection below
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  //passing in an empty object into the find method tells Node to get all the entries
  var data = userData.find({});
  //if we successfully find data, it will render the index page and pass the docs
  data.on('success', function(docs) {
    res.render('index', {items: docs});
  });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  //passes the item I want to enter into the data
  userData.insert(item);

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  //the id method below transforms any id into an id object to pass into the data
  // userData.update({"_id": db.id(id)}, item);
  userData.updateById(id, item);
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  //the id method below transforms any id into an id object to pass into the data
  // userData.remove({"_id": db.id(id)});
  userData.removeById(id);
});

module.exports = router;
