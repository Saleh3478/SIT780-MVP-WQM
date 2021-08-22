var express = require('express');
// const bodyParser = require('body-parser');
// const url = require('url');
// const querystring = require('querystring');

var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://admin:admin@172.21.0.2:27017/wqmdb'
var url = 'mongodb://admin:admin@localhost:27017/wqmdb'
/* GET home page. */
router.get('/', function(req, res, next) {

  //res.render('index', { title: 'Express' });
  MongoClient.connect(url, function(err, client) { 
    const db = client.db("wqmdb");    
    var collection = db.collection('qreadings');
    collection.find().sort({"location":1}).toArray(function (err, readings) {
         if (err) throw err;
         console.log(readings)
         res.render('reading', { data: readings, title: 'Water Quality Visulization'});
         //res.json(docs); 
     });    
 }); 
});

module.exports = router;