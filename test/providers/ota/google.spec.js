var expect = require('chai').expect;
var google = require('../../../lib/providers/ota/google');

describe('google', function() {

  it('should generate base one way url', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }]
    };

    expect(google(opts)).to.equal('https://www.google.com/flights/#search;tt=o;f=YYZ;t=SFO;d=2016-03-17');
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

    expect(google(opts)).to.equal('https://www.google.com/flights/#search;f=YYZ;t=SFO;d=2016-03-17;r=2016-03-23');
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

    expect(google(opts)).to.equal('https://www.google.com/flights/#search;tt=m;iti=YYZ_SFO_2016-03-17*SFO_YYZ_2016-03-23*SFO_YYZ_2016-03-24');
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

    expect(google(opts)).to.equal('https://www.google.com/flights/#search;tt=m;iti=YYZ_SFO_2016-03-17*SFO_YXE_2016-03-23');
  });

});