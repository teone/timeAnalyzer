'use strict';

describe('Service: dayTotal', function () {

  // load the service's module
  beforeEach(module('timeAnalyzerApp'));

  // instantiate service
  var dayTotal;
  beforeEach(inject(function (_dayTotal_) {
    dayTotal = _dayTotal_;
  }));

  it('should do something', function () {
    expect(!!dayTotal).toBe(true);
  });

});
