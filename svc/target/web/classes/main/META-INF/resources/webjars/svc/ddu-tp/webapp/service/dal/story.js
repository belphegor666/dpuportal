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

    $delegate.getStoriesForSprint = function(sprintId) {
        deferred = $q.defer();

        $http.get('/api/sprints/' + sprintId + '/stories').then(successCallback, errorCallback);

        return deferred.promise;
    };

    $delegate.saveStory = function(sprintId, storyToSave) {
        deferred = $q.defer();

        var isUpdate = storyToSave.hasOwnProperty("storyId");

        if(!isUpdate) {
            $http.post('/api/sprints/' + sprintId + '/stories', storyToSave).then(successCallback, errorCallback);
        } else {
            $http.put('/api/sprints/' + sprintId + '/stories', storyToSave).then(successCallback, errorCallback);
        }

        return deferred.promise;
    };

    $delegate.deleteStory = function(storyToDelete) {
        deferred = $q.defer();

        $http.delete('/api/stories/' + storyToDelete.storyId).then(successCallback, errorCallback);

        return deferred.promise;
    };

    $delegate.getStoriesAssignedToUser = function (userId) {
        var deferred = $q.defer();
        $http.get('/api/users/' + userId + '/stories').then(
            function (stories) {
                deferred.resolve(stories.data);
                $log.debug("Dal-getStoriesAssignedToUser : " + JSON.stringify(stories));
            }, function (e) {
                deferred.reject(e);
                $log.error("DAL:getStoriesAssignedToUser :" + JSON.stringify(e));
            });
        return deferred.promise;
    };

    $log.debug("DAL:Story Instantiated");
    return $delegate;

}]);