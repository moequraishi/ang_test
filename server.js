const express = require('express'),
  app = express(),
  routes = require('./server/routes/routes.js')(app),
  port = 1337;

app.listen(port, function() {
  console.log('Listening on port: ', port);
});
