'use strict';

/**
 * @ngdoc service
 * @name timeAnalyzerApp.taskTotal
 * @description
 * # taskTotal
 * Service in the timeAnalyzerApp.
 */
angular.module('timeAnalyzerApp')
.service('taskTotal', function taskTotal(_) {

    this.getTaskTotal = function(formattedRes){

        var grandTotal = 0;

        var totalProject = {};

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

            //checking that project label is not empty
            if(projectLabel && projectLabel !== ''){

                console.log(projectLabel);

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
                    
                    //incremente the project total
                    projectTotalTime += totalTaskTime;

                    //incremente the total worked
                    grandTotal += totalTaskTime;
                });

                //assign to task group object to the project object
                totalProject[projectLabel] = totalTask;

                //assign the total time workend on a project to that project object
                totalProject[projectLabel].total = projectTotalTime;
            }
        });

        return {projects: totalProject, total: grandTotal};
    };
});
