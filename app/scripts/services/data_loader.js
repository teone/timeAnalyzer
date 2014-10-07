'use strict';

// dataLoader service
// ==================
// This service load the time tracked data from a .csv file generated with Caato TimeTracker
angular.module('timeAnalyzerApp')
.service('dataLoader', function dataLoader($http, $q) {
	this.getData = function(){
		var deferred = $q.defer();
		$http.get('files/data.csv').success(function(data){
			deferred.resolve(data);
		}).error(function(err){
			deferred.reject(err);
		});
		return deferred.promise;
	}
});
