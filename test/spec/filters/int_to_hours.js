'use strict';

describe('Filter: intToHours', function () {

  // load the filter's module
  beforeEach(module('timeAnalyzerApp'));

  // initialize a new instance of the filter before each test
  var intToHours;
  beforeEach(inject(function ($filter) {
    intToHours = $filter('intToHours');
  }));

  it('should return the input prefixed with "intToHours filter:"', function () {
    var text = 'angularjs';
    expect(intToHours(text)).toBe('intToHours filter: ' + text);
  });

});
