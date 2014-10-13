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
    	var groupedTask = _.groupBy(formattedRes, 'TASK');

    	//calculate the total splitted by task
    	var totalTask = {};

    	_.forEach(groupedTask, function(taskGroup){
    		var label = taskGroup[0].TASK;
    		var totalTaskTime = 0;
    		_.forEach(taskGroup, function(task){
    			if(task.HOURS){
    				totalTaskTime += parseFloat(task.HOURS.replace(',','.'), 10);
    			}
    		});
    		totalTask[label] = totalTaskTime;
    	});

    	$scope.totalTask = totalTask;

    	//calculate the total hours tracked
    	var grandTotal = 0
    	_.forEach($scope.totalTask, function(groupTotal){
    		grandTotal += groupTotal;
    	});

    	$scope.grandTotal = grandTotal;
    };

  });
