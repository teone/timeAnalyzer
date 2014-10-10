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
    dataLoader.getData().then(
    	function(res){
    		var formattedRes = csvToJson.toJson(res);
    		$scope.timeTracked = formattedRes;

    		getTaskTotal(formattedRes);
            getLongestDay(formattedRes);
    	},
    	function(err){
    		$scope.err = err;
    	}
    );

    var getTaskTotal = function(formattedRes){
    	var groupedRes = _.groupBy(formattedRes, 'TASK');

    	//calculate the total splitted by task
    	var total = {};

    	_.forEach(groupedRes, function(taskGroup){
    		var label = taskGroup[0].TASK;
    		var totalTime = 0;
    		_.forEach(taskGroup, function(task){
    			if(task.HOURS){
    				totalTime += parseFloat(task.HOURS.replace(',','.'), 10);
    			}
    		});
    		total[label] = totalTime;
    	});

    	$scope.total = total;

    	//calculate the total hours tracked
    	var grandTotal = 0
    	_.forEach($scope.total, function(groupTotal){
    		grandTotal += groupTotal;
    	});

    	$scope.grandTotal = grandTotal;
    };

    var getLongestDay =function(formattedRes){
        var groupedRes = _.groupBy(formattedRes, 'START');
        //raggruppare per data (va tolta l'ora)
        // fare la somma del singolo giorno
        //ritornare _.max()
        console.log(groupedRes);
    };
  });
