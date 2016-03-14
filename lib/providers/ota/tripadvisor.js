var _ = require('lodash');
var util = require('util');

var BASE_URL = 'http://www.tripadvisor.com/CheapFlights?'

function roundTrip(opts) {
  var d = opts.legs[0];
  var r = opts.legs[1];
  return util.format(
    'airport0=%s&airport1=%s&date0=%s&date1=%s',
    d.from, 
    d.to, 
    d.date.replace(/-/g, ''),
    r.date.replace(/-/g, '')
  );
}

function multiCity(opts) {
  var airport = 0;
  var date = 0;
  return _.join(_.map(opts.legs, function(leg) {
    return util.format(
      'airport%s=%s&airport%s=%s&date%s=%s',
      airport++,
      leg.from,
      airport++,
      leg.to,
      date++,
      leg.date
    );
  }), '&');
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

  return _.join(details, '/');
}

function toUrl(opts) {
  var url = BASE_URL + getFlights(opts);
  var details = getDetails(opts)
  if (!_.isEmpty(details)) {
    url += '&' + details;
  }

  return url
}

module.exports = toUrl;
