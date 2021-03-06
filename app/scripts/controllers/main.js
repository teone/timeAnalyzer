'use strict';

/**
 * @ngdoc function
 * @name timeAnalyzerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timeAnalyzerApp
 */
angular.module('timeAnalyzerApp')
  .controller('MainCtrl', function ($scope, $firebase, toaster, csvToJson, taskTotal, dayTotal, _) {

    //Connect to Firebase
    // connect to firebase 
    var ref = new Firebase("https://time-analyzer.firebaseio.com/month");  
    var month = $firebase(ref);

    $scope.history = month.$asArray();

    console.log($scope.history);

    $scope.showContent = function($fileContent){

        //checking month name
        if(!$scope.monthName){
            $scope.err = "Month Name is Mandatory";
            return;
        }

        var formattedRes = csvToJson.toJson($fileContent);
        $scope.timeTracked = formattedRes;

        //get Project related data
        var taskCalculation = taskTotal.getTaskTotal(formattedRes);

        //publish the result to the scope
        $scope.totalProject = taskCalculation.projects;
        $scope.grandTotal = taskCalculation.total;

        //get data on Daily Basis
        $scope.dailyResume = dayTotal.getHoursPerDay(formattedRes);

        console.log($scope.totalProject);

        month.$push({
            name: $scope.monthName,
            timeWorked: $scope.grandTotal,
            projectList: $scope.totalProject,
            dailyResume: $scope.dailyResume
        });
    };

    $scope.toggleMonth = function(monthName, kind){
        if($scope.selectedMonth === monthName && $scope.kind === kind){
            $scope.selectedMonth = null;
            $scope.kind = null;
        }
        else{
            $scope.selectedMonth = monthName;
            $scope.kind = kind;
        }
    }

    $scope.deleteMonth = function(month){
        var item = month.name;
        $scope.history.$remove(month).then(function(res){
            toaster.pop('error', item + " deleted!", "This month has been successfully deleted");
        })
    }

    $scope.toggleProject = function(pkey){
        if($scope.selectedProject === pkey){
            $scope.selectedProject = null;
        }
        else{
            $scope.selectedProject = pkey;
        }
    }

    $scope.reset = function(){
        $scope.totalProject = null;
        $scope.grandTotal = null;
        $scope.dailyResume = null;
        $scope.timeTracked = null;
    }

    $scope.getDays = function(dailyResume){
        return dailyResume.length;
    }

    $scope.getDayAverage = function(dailyResume, total){
        var workingDays = dailyResume.length;
        return total/workingDays;
    }
  });