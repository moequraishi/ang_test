const bodyParser = require('body-parser'),
  express = require('express'),
  path = require('path'),
  Note = require('../models/notes.js');

module.exports = function(app) {
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../dist/anonymous-notes/')));

  app.get('/', function(req, res) {
    console.log('get running');
    res.sendFile(__dirname + '/dist/anonymous-notes/index.html');
  });

  // Create new note
  app.post('/new',function(req,res) {
    const newTask = new Note({note: req.body.note});
    newTask.save(function(err, data){
      if (err) {
        console.log(err);
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    });
  });

  // Read / get all notes
  app.get('/notes', function (req, res) {
    Note.find({}).sort({createdAt: -1}).exec(function(err, data) {
      if (err) {
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    });
  });

  app.post('/remove/:id',  function (req, res) {
    Note.deleteOne({_id: req.params.id}, function (err, data) {
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
