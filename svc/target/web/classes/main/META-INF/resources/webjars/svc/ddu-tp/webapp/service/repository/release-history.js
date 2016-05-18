"use strict";

/**
 * Release History Repository
 */
angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", function ($delegate, $q, $log, dal) {

    //Get an array of stories for a particular sprint
    $delegate.getReleaseHistories = function() {
        var deferred = $q.defer();
        dal.getReleaseHistories().then(function (results){
            deferred.resolve(results);
        }, function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    };

    $log.debug("Repository:Release-History Instantiated");
    return $delegate;
}]);
