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

    $delegate.getReleaseHistories = function() {
        deferred = $q.defer();

        $http.get('/api/release-history').then(successCallback, errorCallback);

        return deferred.promise;
    };

    $log.debug("DAL:Release-History Instantiated");
    return $delegate;

}]);