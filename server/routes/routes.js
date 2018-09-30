const bodyParser = require('body-parser'),
  express = require('express'),
  path = require('path'),
  Gold = require('../models/gold.js');
let currentGold = 0;

module.exports = function(app) {
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../dist/ninja-gold/')));

  app.get('/', function(req, res) {
    console.log('get running');
    res.sendFile(__dirname + '/dist/ninja-gold/index.html');
  });

  app.post('/newgame',function(req,res) {
    const newGame = new Gold({gold:  req.body.gold});
    newGame.save(function(err, data){
      if (err) {
        console.log(err);
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    });
  });

  app.post('/farm', function(req, res) {
    console.log('post data: ', req.body.gold);
    Gold.findOneAndUpdate({_id: req.body.data}, {$set: {gold: req.body.gold}}, function(err, data) {
      if(err) {
        console.log('error setting the data');
      } else {
        console.log('Gold amount updated!');
      }
    });
    // currentGold += req.body.data;


  });

  app.get('/gold', function (req, res) {
    Gold.find({}, function(err, data) {
      if (err) {
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    });
  });

  app.get('/remove',  function (req, res) {
    Gold.remove({}, function (err, data) {
      if (err) {
        console.log("error: ", err);
        res.json({message: "Error", error: err});
      } else {
        console.log('delete success', data);
        res.json({data});
      }
    })
  });

};
