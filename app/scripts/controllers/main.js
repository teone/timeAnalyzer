'use strict';

/**
 * @ngdoc function
 * @name timeAnalyzerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timeAnalyzerApp
 */
angular.module('timeAnalyzerApp')
  .controller('MainCtrl', function ($scope, csvToJson, taskTotal, dayTotal, _) {

    $scope.showContent = function($fileContent){
        var formattedRes = csvToJson.toJson($fileContent);
        $scope.timeTracked = formattedRes;

        //get Project related data
        var taskCalculation = taskTotal.getTaskTotal(formattedRes);

        //publish the result to the scope
        $scope.totalProject = taskCalculation.projects;
        $scope.grandTotal = taskCalculation.total;

        //get data on Daily Basis
        $scope.dailyResume = dayTotal.getHoursPerDay(formattedRes);
    };
  });