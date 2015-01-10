'use strict';

/**
 * @ngdoc overview
 * @name timeAnalyzerApp
 * @description
 * # timeAnalyzerApp
 *
 * Main module of the application.
 */
angular
  .module('timeAnalyzerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'intToHours',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('_', function() {
    return window._; // assumes underscore has already been loaded on the page
  });
