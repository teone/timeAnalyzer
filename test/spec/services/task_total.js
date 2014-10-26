'use strict';

describe('Service: taskTotal', function () {

  // load the service's module
  beforeEach(module('timeAnalyzerApp'));

  // instantiate service
  var taskTotal;
  beforeEach(inject(function (_taskTotal_) {
    taskTotal = _taskTotal_;
  }));

  it('should do something', function () {
    expect(!!taskTotal).toBe(true);
  });

});
