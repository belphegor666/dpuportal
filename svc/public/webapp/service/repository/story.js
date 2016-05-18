"use strict";

/**
 * Visitor Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", function ($delegate, $q, $log, dal) {

    //Get an array of stories for a particular sprint
    $delegate.getStoriesForSprint = function(sprintId) {
        var deferred = $q.defer();
        dal.getStoriesForSprint(sprintId).then(function (results){
            deferred.resolve(results);
        }, function(error){
                deferred.reject(error);
        });

        return deferred.promise;
    };

    //Adds or amends the story
    $delegate.saveStory = function(sprintId, storyToSave) {
        var deferred = $q.defer();

        dal.saveStory(sprintId, storyToSave).then(function(response) {
            deferred.resolve(response);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    //Delete a story
    $delegate.deleteStory = function(storyToDelete) {
        var deferred = $q.defer();

        dal.deleteStory(storyToDelete).then(function(response) {
            deferred.resolve(response);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };


    $delegate.getStoriesAssignedToUser = function () {
        var deferred = $q.defer();
        var userId = $delegate.getUserId();
            dal.getStoriesAssignedToUser(userId).then(function (results) {
                deferred.resolve(results);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    $delegate.getStoriesAssignedToOtherUser = function (userId) {
        var deferred = $q.defer();
        dal.getStoriesAssignedToUser(userId).then(function (results) {
            deferred.resolve(results);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    $log.debug("Repository:Story Instantiated");
    return $delegate;
}]);
