"use strict";

/**
 * Visitor Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", function ($delegate, $q, $log, dal) {

    var user = {};

    var selectedProject = null;

    var previousBaseState = null;

    $delegate.setSelectedProject = function (project) {
        selectedProject = project;
    };

    $delegate.getSelectedProject = function () {
        return selectedProject;
    };

    $delegate.setPreviousBaseState = function (state) {
        previousBaseState = state;
    };

    $delegate.getPreviousBaseState = function () {
        return previousBaseState;
    };

    $delegate.getUser = function() {
        var newUser = angular.copy(user);
        return newUser;
    };

    $delegate.getUserId = function() {
        return user.userId;
    };

    $delegate.getUserSystemRole = function() {
        return user.systemRole;
    };

    $delegate.getUserEmail = function() {
        return user.email;
    };

    $delegate.getUserHomePagePreference = function() {
        return user.homePagePreference;
    };

    $delegate.setUser = function(userDetails) {
        user.title = userDetails.title;
        user.firstName = userDetails.firstName;
        user.lastName = userDetails.lastName;
        user.systemRole = userDetails.role;
        user.twitterUrl = userDetails.twitterUrl;
        user.linkedInUrl = userDetails.linkedInUrl;
        user.homePagePreference = userDetails.homePagePreference;
        user.email = userDetails.email;
        user.userId = userDetails.subject;
    };

    $delegate.setUserHomePagePreference = function(homepage) {
        user.homePagePreference = homepage;
    };

    $delegate.clearUser = function() {
        user = {};
    };

    $delegate.editAccountDetails = function(credentials) {
        var deferred = $q.defer();

        dal.editAccountDetails(credentials).then(function(response) {
            $delegate.setUser(credentials);
            deferred.resolve(response);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $log.debug("Repository:User Cache Instantiated");
    return $delegate;
}]);
