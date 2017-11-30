var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//connect the path to the database
mongoose.connect('localhost:27017/test');
//Schemas tell Mongoose what the data looks like and how to use it
var Schema = mongoose.Schema;

  //this defines the schema or makes a blueprint for it
var userDataSchema = new Schema({
  //you can make objects required like below
  title: {type: String, required: true},
  content: String,
  author: String
  //you can force a collection came like below
}, {collection: 'user-data'});

//entering actual model 
var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  UserData.find()
  //.then handles the data
      .then(function(doc) {
        res.render('index', {items: doc});
      });
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  var data = new UserData(item);
  //saves the data to the database
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  UserData.findById(id, function(err, doc) {
    //handles errors
    if (err) {
      console.error('error, no entry found');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  //passes id and executes the method
  UserData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;
