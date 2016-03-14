var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var providers = require('./providers');
var util = require('util');

var app = express();
app.use(bodyParser.json());

function qsToBody(req, res, next) {
  var legs = _.map(req.query.legs.split(','), function(leg) {
    var details = leg.split('-');
    return {
      from: details[0],
      to: details[1],
      date: details[2]
    }
  });

  req.body = {
    legs: legs
  }
  next();
}

function listUrls(req, res) {
  res.send(_.map(providers, function(toUrl, name) {
    return {
      provider: name,
      url: toUrl(req.body)
    }
  }));
}

app.get('/flights', qsToBody, listUrls);
app.post('/flights', listUrls);

function getUrl(req, res) {
  var p = req.params.provider;
  if (providers[p]) {
    res.send({
      provider: p,
      url: providers[p](req.body)
    });
  } else {
    res.status(404).send({
      status: 404,
      message: util.format('No provider with format: %s', p)
    });
  }
}

app.get('/flights/:provider', qsToBody, getUrl);
app.post('/flights/:provider', getUrl);

app.get('/providers', function(req, res) {
  var p = _.map(providers, function(toUrl, name) {
    return name;
  });

  res.send({ providers: p });
});

app.get('/', function(req, res) {
  res.send('hello world');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log('app running on port: ' + port);
});
