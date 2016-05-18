"use strict";

/**
 * Visitor Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", function ($delegate, $q, $log, dal) {

    //Get an array of sprints for a particular project
    $delegate.getSprintsForProject = function(projectId) {
        var deferred = $q.defer();

        dal.getSprintsForProject(projectId).then(function (results) {

            for(var i = 0; i < results.length; i++) {
                results[i].startDate = new Date(results[i].startDate);
                results[i].endDate = new Date(results[i].endDate);
            }

            deferred.resolve(results);
        }, function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    //Will add a sprint or amend it
    $delegate.saveSprint = function(sprintToSave, projectId) {
        var deferred = $q.defer();

        var isUpdate = sprintToSave.hasOwnProperty("sprintId");

        dal.saveSprint(sprintToSave).then(function (savedSprint) {

            sprintToSave.sprintId = savedSprint.id;
            sprintToSave.projectId = projectId;

            var today = new Date();
            //Move to backend?
            if((sprintToSave.startDate <= today.getTime()) && (sprintToSave.endDate >= today.getTime())) {
                sprintToSave.status="IN_PROGRESS";
            }

            deferred.resolve(sprintToSave);

        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $log.debug("Repository:Sprint Cache Instantiated");
    return $delegate;
}]);
