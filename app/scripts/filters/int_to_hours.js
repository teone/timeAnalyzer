'use strict';

/**
 * @ngdoc filter
 * @name timeAnalyzerApp.filter:intToHours
 * @function
 * @description
 * # intToHours
 * Filter in the timeAnalyzerApp.
 */
angular.module('timeAnalyzerApp')
.filter('intToHours', function () {
    return function (input) {

        if(input && typeof input !== 'undefined'){
            var hours = parseInt(input, 10);
            var minutes = (input - hours) * 60;

            minutes = parseInt(minutes,10);

            if(minutes.length === 1){
                minutes = '0'+minutes;
            }
            
            return hours + ':' + minutes;
        }
    };
});