"use strict";

/**
 * Module decorator for the Data Access Layer (DAL) module, extending it with a function for activating a user account.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {
    $delegate.activate = function (key) {
        var deferred = $q.defer();

        // This is where the PUT request to the backend REST service is made.
        try {
            $http.put('/api/account/activate?key='+ key).then(
                function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error);
                }
            );
        } catch (exception) {
            deferred.reject(exception);
        }

        return deferred.promise;
    };

    $log.debug("DAL:Activate instantiated");
    return $delegate;
}]);
