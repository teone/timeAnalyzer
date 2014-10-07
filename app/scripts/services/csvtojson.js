'use strict';

// csvToJson service
// ==================
// This service conver a csv file into a Json array
angular.module('timeAnalyzerApp')
  .service('csvToJson', function csvToJson() {
    this.toJson = function (csv){

		var lines=csv.split("\n");

		var result = [];

		var headers=lines[0].split(";");

		for(var i=1;i<lines.length;i++){

			var obj = {};

			//set an id
			obj.id = i;

			var currentline=lines[i].split(";");

			for(var j=0;j<headers.length;j++){
				obj[headers[j]] = currentline[j];
			  }
			result.push(obj);

		}
		  
		return result;
	}

  });
