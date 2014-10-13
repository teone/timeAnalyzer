'use strict';

/**
 * @ngdoc function
 * @name timeAnalyzerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timeAnalyzerApp
 */
angular.module('timeAnalyzerApp')
  .controller('MainCtrl', function ($scope, dataLoader, csvToJson, _) {

     $scope.showContent = function($fileContent){
        var formattedRes = csvToJson.toJson($fileContent);
        $scope.timeTracked = formattedRes;

        getTaskTotal(formattedRes);
    };

    var getTaskTotal = function(formattedRes){

        var grandTotal = 0;

        $scope.totalProject = {};

        var groupedProject = _.groupBy(formattedRes, 'PROJECT');

        _.forEach(groupedProject, function(project){

            var projectLabel = project[0].PROJECT;
            var projectTotalTime = 0;
            var groupedTask = _.groupBy(project, 'TASK');

            //calculate the total splitted by task
            var totalTask = {};
            var totalTaskTime;
            _.forEach(groupedTask, function(taskGroup){
                var label = taskGroup[0].TASK;
                totalTaskTime = 0;
                _.forEach(taskGroup, function(task){
                    if(task.HOURS){
                        totalTaskTime += parseFloat(task.HOURS.replace(',','.'), 10);
                    }
                });
                totalTask[label] = totalTaskTime;
            });

            $scope.totalProject[projectLabel] = totalTask;
            projectTotalTime += totalTaskTime; 
            $scope.totalProject[projectLabel].total = projectTotalTime;

            //calculate the total hours tracked
            _.forEach($scope.totalTask, function(groupTotal){
                grandTotal += groupTotal;
            });
        });

        console.log($scope.totalProject);
    	$scope.grandTotal = grandTotal;
    };

  });
