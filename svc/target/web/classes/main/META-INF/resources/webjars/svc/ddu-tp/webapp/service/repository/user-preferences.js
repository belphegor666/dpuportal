"use strict";

/**
 * Visitor Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", function ($delegate, $q, $log, dal) {

    //Save User Preferences
    $delegate.saveUserPreferences = function(credentials) {
        var deferred = $q.defer();

        credentials.userId = $delegate.getUserId();

        dal.saveUserPreferences(credentials).then(function (success){
            deferred.resolve(success);
        }, function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $log.debug("Repository:User Preferences Cache Instantiated");
    return $delegate;
}]);
