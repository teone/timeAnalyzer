'use strict';

/**
 * @ngdoc service
 * @name timeAnalyzerApp.dayTotal
 * @description
 * # dayTotal
 * Service in the timeAnalyzerApp.
 */
angular.module('timeAnalyzerApp')
.service('dayTotal', function dayTotal(_) {
    
    this.getHoursPerDay = function(data){

        var result = [];

        //group the task by day
        var groupedData = _.groupBy(data, function(item){
            if(item.START){
                return item.START.substr(0,9);
            }
        });

        //cicle trough each day
        for (var key in groupedData){
            //set the daily total to 0
            var dailyTotal = 0;
            
            //cicle trought each task in a day
            _.forEach(groupedData[key], function(task){
                if(task.HOURS){
                    dailyTotal += parseFloat(task.HOURS.replace(',','.'), 10);
                }
            });
            
            if(key && dailyTotal){
                result.push({date: key, total: dailyTotal});
            }
        };

        return result;
      };

  });