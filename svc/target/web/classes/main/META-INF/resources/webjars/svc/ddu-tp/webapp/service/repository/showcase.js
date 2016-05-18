"use strict";

/**
 * Showcase Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", function ($delegate, $q, $log, dal) {

    $delegate.getShowcases = function(sprintToSave, projectId) {
        var deferred = $q.defer();

        dal.getShowcases().then(function (response) {
            deferred.resolve(response);
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $log.debug("Repository:Showcase Instantiated");
    return $delegate;
}]);
