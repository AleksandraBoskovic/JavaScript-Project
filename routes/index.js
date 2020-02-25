var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'Marvel';
let db = null;
// Use connect method to connect to the server
MongoClient.connect(url,  { useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addPlayer',async function (req, res) {
  console.log(req.body);
  await db.collection('player').insert(req.body);
  res.send({});
})

router.post('/players', async function (req, res) {
  console.log(req.body);
  let players = await db.collection('player').find().toArray();
  res.send(players);
})

module.exports = router;
