var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://admin:admin@172.21.0.2:27017/wqmdb'
var url = 'mongodb://admin:admin@localhost:27017/wqmdb'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getRandomReading(min, max) {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, 2);
    return Math.floor(rand * power) / power;
}

function computeWQuality(){     
    // to be added
    var rand = Math.random() * (1 - 0.88) + 0.88;
    var power = Math.pow(10, 2);
    return Math.floor(rand * power) / power;
}
/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    MongoClient.connect(url, function (err, client) {

        const db = client.db("wqmdb");
        var reading_collection = db.collection('qreadings');
        var location_collection = db.collection('location');
        // documents to be inserted 
        location_collection.find().toArray(function (err, locations) {
            if (err) throw err;
            var docs = [];
            const loc_count = Object.keys(locations).length;
            for (i = 0; i < 100; i++) {
                const loc = getRandomInt(loc_count);
                const loc_name = locations[loc].name;
                const totalChlorine = getRandomReading(1.12, 2.2);
                const fluoride = getRandomReading(0.88, 1.2);
                const pH = getRandomReading(7.61, 7.97);
                const solids = getRandomReading(101, 104);
                const temperature = getRandomReading(15.4, 23.1);
                const wquality =computeWQuality(totalChlorine, fluoride, pH, solids, temperature);

                const reading_input = {
                    location: loc_name, totalChlorine: totalChlorine, fluoride: fluoride, pH: pH, solids: solids, temperature: temperature, wquality: wquality};
                docs.push(reading_input)
            }
            //console.log(docs);
            reading_collection.insertMany(docs, function (err, res) {
                if (err) throw err;
                console.log(res.insertedCount + " documents inserted");
                // close the connection to db when you are done with it 
            });
        });

        reading_collection.find().toArray(function (err, readings) {
            if (err) throw err;
            res.render('reading', { data: readings, title: 'Water Quality Visulization' });
            //res.json(docs); 
        }); 

    });
});

module.exports = router;