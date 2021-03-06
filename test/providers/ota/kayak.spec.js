var expect = require('chai').expect;
var kayak = require('../../../lib/providers/ota/kayak');

describe('kayak', function() {

  it('should generate base one way url', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }]
    };

    expect(kayak(opts)).to.equal('https://www.kayak.com/flights/YYZ-SFO/2016-03-17');
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

    expect(kayak(opts)).to.equal('https://www.kayak.com/flights/YYZ-SFO/2016-03-17/2016-03-23');
  });

  it('should generate base multi city url', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }, {
        from: 'SFO',
        to: 'YYZ',
        date: '2016-03-23'
      }, {
        from: 'SFO',
        to: 'YYZ',
        date: '2016-03-24'
      }]
    };

    expect(kayak(opts)).to.equal('https://www.kayak.com/flights/YYZ-SFO/2016-03-17/SFO-YYZ/2016-03-23/SFO-YYZ/2016-03-24');
  });

  it('should generate multi city url for 2 flights', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }, {
        from: 'SFO',
        to: 'YXE',
        date: '2016-03-23'
      }]
    };

    expect(kayak(opts)).to.equal('https://www.kayak.com/flights/YYZ-SFO/2016-03-17/SFO-YXE/2016-03-23');
  });

});