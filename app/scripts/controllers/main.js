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

        //group the entry by project
        var groupedProject = _.groupBy(formattedRes, 'PROJECT');

        //cicle the project
        _.forEach(groupedProject, function(project){

            //assign the label
            var projectLabel = project[0].PROJECT;

            //define an empty var for this Project total time
            var projectTotalTime = 0;

            //group the project's task
            var groupedTask = _.groupBy(project, 'TASK');

            //define an object to store the task total
            var totalTask = {};

            //define an empty var for the counter of task total time
            var totalTaskTime;

            //cicle the Project's group of tasks
            _.forEach(groupedTask, function(taskGroup){

                //assign a label to the task
                var label = taskGroup[0].TASK;

                //resetting the calculated time for this task
                totalTaskTime = 0;

                //cicle each entry of a task group
                _.forEach(taskGroup, function(task){

                    if(task.HOURS){
                        //update the task total
                        totalTaskTime += parseFloat(task.HOURS.replace(',','.'), 10);
                    }
                });
                //assign the total time worked on a task to that task
                totalTask[label] = totalTaskTime;
                console.log(totalTask);
                //incremente the total worked
                grandTotal += totalTaskTime;
            });

            //assign to task group object to the project object
            $scope.totalProject[projectLabel] = totalTask;
        });

        console.log($scope.totalProject);
    	$scope.grandTotal = grandTotal;
    };

  });
