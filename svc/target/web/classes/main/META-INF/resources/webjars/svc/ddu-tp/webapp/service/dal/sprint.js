"use strict";

/**
 * Data Access Module
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    var deferred;

    //Common success callbacks
    var successCallback = function(response) {
        deferred.resolve(response.data);
    };

    var errorCallback = function(error) {
        deferred.reject(error.data);
    };

    $delegate.getSprintsForProject = function(projectId) {
        deferred = $q.defer();

        $http.get('/api/projects/' + projectId + '/sprints').then(successCallback, errorCallback);

        return deferred.promise;
    };

    $delegate.saveSprint = function(sprintToSave) {
         deferred = $q.defer();

         var projectId = sprintToSave.projectId;
         delete sprintToSave.projectId;
    
         var isUpdate = sprintToSave.hasOwnProperty("sprintId");

         if(!isUpdate) {
            $http.post('/api/projects/' + projectId + '/sprints', sprintToSave).then(successCallback, errorCallback);
         } else {
            delete sprintToSave.status;
            delete sprintToSave.members;
            $http.put('/api/sprints', sprintToSave).then(successCallback, errorCallback);
         }

        return deferred.promise;
    };

    $log.debug("DAL:Sprint Instantiated");
    return $delegate;

}]);