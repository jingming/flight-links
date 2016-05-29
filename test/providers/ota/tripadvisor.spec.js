var expect = require('chai').expect;
var tripadvisor = require('../../../lib/providers/ota/tripadvisor');

describe('tripadvisor', function() {

  it('should generate base one way url', function() {
    var opts = {
      legs: [{
        from: 'YYZ',
        to: 'SFO',
        date: '2016-03-17'
      }]
    };

    expect(tripadvisor(opts)).to.equal('http://www.tripadvisor.com/CheapFlights?airport0=YYZ&airport1=SFO&date0=2016-03-17');
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

    expect(tripadvisor(opts)).to.equal('http://www.tripadvisor.com/CheapFlights?airport0=YYZ&airport1=SFO&date0=20160317&date1=20160323');
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

    expect(tripadvisor(opts)).to.equal('http://www.tripadvisor.com/CheapFlights?airport0=YYZ&airport1=SFO&date0=2016-03-17&airport2=SFO&airport3=YYZ&date1=2016-03-23&airport4=SFO&airport5=YYZ&date2=2016-03-24');
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

    expect(tripadvisor(opts)).to.equal('http://www.tripadvisor.com/CheapFlights?airport0=YYZ&airport1=SFO&date0=2016-03-17&airport2=SFO&airport3=YXE&date1=2016-03-23');
  });

});