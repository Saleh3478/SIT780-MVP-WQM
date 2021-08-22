'use strict';

const express = require('express');
var mongo = require('mongodb');

//var url = 'mongodb://mongo:27017/wqmdb'
var url = 'mongodb://admin:admin@172.21.0.2:27017/wqmdb'

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, client) {
    const db = client.db("wqmdb")
    db.listCollections().toArray(function(err, items) {
           console.log(items);
           //and u can loop over items to fetch the names
           client.close();
   });
}); 
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log('Database created!');
//     console.log(db);
//     db.listCollections().toArray(function (err, names) {
//         if (!err) {
//             console.log(names)
//         }
//     });
//     db.close();
//  });

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();

// functions 
var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('location');
    // Find some documents
    collection.find().toArray(function (err, docs) {
        assert.equal(err, null);
        // assert.equal(2, docs.length);
        console.log('Found  the following records');
        callback(docs);
    });
}

app.get('/', (req, res) => {
    MongoClient.connect(url, function(err, client) { 
        const db = client.db("wqmdb");    
       var collection = db.collection('location');
       collection.find().toArray(function (err, docs) {
            if (err) throw err;
            console.log(docs)
            res.json(docs); 
        });    
    }); 
});
app.listen(PORT, HOST);
console.log('Running on http://${HOST}:${PORT}');