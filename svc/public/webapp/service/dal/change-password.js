"use strict";

/**
 * Module decorator for the Data Access Layer (DAL) module, extending it with a function for changing a password.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", "securityStore", function ($delegate, $q, $log, $http, securityStore) {

    $delegate.changePassword = function (credentials) {
        var deferred = $q.defer();

        // This is where the POST request to the backend REST service is made.
        try {
            credentials.userId = securityStore.getSubject();
            $http.post('/api/account/change-password', credentials).then(
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

    $log.debug("DAL:Change Password instantiated");
    return $delegate;
}]);
