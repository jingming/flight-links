var expect = require('chai').expect;
var skyscanner = require('../../../lib/providers/ota/skyscanner');

describe('skyscanner', function() {

  it('should generate base one way url', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }]
    };

    expect(skyscanner(opts)).to.equal('http://www.skyscanner.com/flights/YYZ/SFO/160317');
  });

  it('should generate base round trip url', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }, {
        from: 'SFO',
        to: 'YYZ',
        date: '2016-03-23'
      }]
    };

    expect(skyscanner(opts)).to.equal('http://www.skyscanner.com/flights/YYZ/SFO/160317/160323');
  });

});