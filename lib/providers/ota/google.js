var _ = require('lodash');
var util = require('util');

var BASE_URL = 'https://www.google.com/flights/#search';
var CLASS = {
  pe: 'p',
  bc: 'b',
  fc: 'f'
};

function oneWay(opts) {
  var leg = opts.legs[0];
  return util.format('tt=o;f=%s;t=%s;d=%s', leg.from, leg.to, leg.date);
}

function roundTrip(opts) {
  var d = opts.legs[0];
  var r = opts.legs[1];
  return util.format('f=%s;t=%s;d=%s;r=%s', d.from, d.to, d.date, r.date);
}

function multiCity(opts) {
  return util.format('tt=m;iti=%s', _.join(_.map(opts.legs, function(leg) {
    return util.format('%s_%s_%s', leg.from, leg.to, leg.date);
  }), '*'));
}

function getFlights(opts) {
  if (_.size(opts.legs) == 1) {
    return oneWay(opts);
  }

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
    details.push(util.format('sc=%s', CLASS[opts.cls]));
  }

  return _.join(details, ';');
}

function toUrl(opts) {
  return _.join(_.filter([BASE_URL, getFlights(opts), getDetails(opts)], function(val) {
    return !_.isEmpty(val);
  }), ';');
}

module.exports = toUrl;
