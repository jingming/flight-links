var _ = require('lodash');
var util = require('util');

var BASE_URL = 'https://www.kayak.com/flights';
var CLASS = {
  pe: 'premium'
};

function roundTrip(opts) {
  var d = opts.legs[0];
  var r = opts.legs[1];
  return util.format('%s-%s/%s/%s', d.from, d.to, d.date, r.date);
}

function multiCity(opts) {
  return _.join(_.map(opts.legs, function(leg) {
    return util.format('%s-%s/%s', leg.from, leg.to, leg.date);
  }), '/');
}

function getFlights(opts) {
  if (_.size(opts.legs) == 2 && 
      opts.legs[0].from == opts.legs[1].to &&
      opts.legs[0].to == opts.legs[1].from) {
    return roundTrip(opts);
  }

  return multiCity(opts);
}

function getDetails(opts) {
  var details = [];

  if (_.isString(opts.cls)) {
    details.push(CLASS[opts.cls]);
  }

  return _.join(details, '/');
}

function toUrl(opts) {
  return _.join(_.filter([BASE_URL, getFlights(opts), getDetails(opts)], function(val) {
    return !_.isEmpty(val);
  }), '/');
}

module.exports = toUrl;
