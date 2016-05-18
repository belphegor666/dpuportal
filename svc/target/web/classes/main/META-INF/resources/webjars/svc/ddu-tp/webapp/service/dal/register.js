"use strict";

/**
 * Module decorator for the Data Access Layer (DAL) module, extending it with a function for registering a user.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {
    $delegate.register = function (credentials) {
        var deferred = $q.defer();

        // This is where the POST request to the backend REST service is made.
        try {
            $http.post('/api/account/register', credentials).then(
                function (success) {
                    deferred.resolve(success);
                }, function (error) {
                    deferred.reject(error.data);
                }
            );
        } catch (exception) {
            deferred.reject(exception);
        }

        return deferred.promise;
    };

    $log.debug("DAL:Register instantiated");
    return $delegate;
}]);
