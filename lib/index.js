var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var providers = require('./providers');

var app = express();
app.use(bodyParser.json());

app.post('/flights', function(req, res) {
  res.send(_.map(providers, function(toUrl, name) {
    return {
      provider: name,
      url: toUrl(req.body)
    }
  }));
});

app.post('/flights/:provider', function(req, res) {
  var p = req.params.provider;
  if (providers[p]) {
    res.send({
      provider: p,
      url: providers[p](req.body)
    });
  } else {
    // TODO: 404 properly
    res.send('nope!');
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('app running on port: ' + port);
});