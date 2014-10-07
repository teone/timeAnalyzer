'use strict';

describe('Service: dataLoader', function () {

  // load the service's module
  beforeEach(module('timeAnalyzerApp'));

  // instantiate service
  var dataLoader;
  beforeEach(inject(function (_dataLoader_) {
    dataLoader = _dataLoader_;
  }));

  it('should do something', function () {
    expect(!!dataLoader).toBe(true);
  });

});
