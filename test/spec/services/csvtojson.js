'use strict';

describe('Service: csvToJson', function () {

  // load the service's module
  beforeEach(module('timeAnalyzerApp'));

  // instantiate service
  var csvToJson;
  beforeEach(inject(function (_csvToJson_) {
    csvToJson = _csvToJson_;
  }));

  it('should do something', function () {
    expect(!!csvToJson).toBe(true);
  });

});
