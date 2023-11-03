// Create web server
var express = require('express');
var router = express.Router();

// Get comments
router.get('/', function(req, res) {
  var db = req.db;
  var collection = db.get('comments');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

// Add comment
router.post('/', function(req, res) {
  var db = req.db;
  var collection = db.get('comments');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

// Delete comment
router.delete('/delete/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('comments');
  var commentToDelete = req.params.id;
  collection.remove({ '_id' : commentToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;