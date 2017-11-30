var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
//assert allows us to compare values and to check if everything in Mongo went right
var assert = require('assert');

//the number below is the default port
// "/test" defines the database we want to use
var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var resultArray = [];
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //.find() will get all the entries in this data
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      //will push all the items our cursor points to and pushes them in the doc below
      resultArray.push(doc);
    }, function() {
      db.close();
      //only renders the view once the rest of the data 
      //is acquired becasue it runs asynchronous, meaning 
      //it runs the function and everything below at the same 
      //time, so it could try and use data that hasn't
      //populated yet
      res.render('index', {items: resultArray});
    });
  });
});

//in the content form we get a title, content, and author
//we get these values in the post below
router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  //how to connect to the mongo database
  mongo.connect(url, function(err, db) {
    //use assert to see if we have an error or not
    assert.equal(null, err);
    //collection is different than a database, you can name it whatever you want
    //insertOne adds one thing to the collection
    db.collection('user-data').insertOne(item, function(err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      //closes the databse connection
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  //need an id to change data
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //pass in the id of they data that should be changed and how it should be changed
    //$set changes the data with whatever follows the colon (in this case "item")
    //note: uses .updateOne
    db.collection('user-data').updateOne({"_id": objectId(id)}, {$set: item}, function(err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    //note: uses .deleteOne
    db.collection('user-data').deleteOne({"_id": objectId(id)}, function(err, result) {
      assert.equal(null, err);
      console.log('Item deleted');
      db.close();
    });
  });
});

module.exports = router;
