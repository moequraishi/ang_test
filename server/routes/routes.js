const bodyParser = require('body-parser'),
  express = require('express'),
  path = require('path'),
  Product = require('../models/products.js');

module.exports = function (app) {
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../dist/product-manager/')));

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/dist/product-manager/index.html');
  });

  // Create new task
  app.post('/new',function(req,res) {
    const newTask = new Product({title: req.body.title, price: req.body.price, imageUrl: req.body.imageUrl});
    newTask.save(function(err, data){
      if (err) {
        console.log(err);
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    });
  });

  // Read / get all tasks
  app.get('/products', function (req, res) {
    Product.find({}, function(err, data) {
      if (err) {
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    });
  });

  // Read / get single task
  app.get('/edit/:id', function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, data) {
      if (err) {
        res.json({message: "Error", error: err});
      } else {
        res.json({data});
      }
    })
  });

  // Update a task
  app.post('/edit/:id', function(req, res) {
    Product.findOneAndUpdate({_id: req.params.id}, {$set: {title: req.body.title, price: req.body.price, imageUrl: req.body.imageUrl}}, {new: true}, function(err, data) {
      if(err) {
        console.log('error setting the data', err);
      } else {
        console.log('Task updated!', data);
      }
    });
  });

  // Delete a task
  app.post('/remove/:id',  function (req, res) {
    Product.deleteOne({_id: req.params.id}, function (err, data) {
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
