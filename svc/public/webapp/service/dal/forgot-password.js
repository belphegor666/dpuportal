"use strict";

/**
 * Module decorator for the Data Access Layer (DAL) module, extending it with a function for resetting a password.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {
    $delegate.forgotPassword = function (emailParameter) {
        var deferred = $q.defer();
        var emailToBeSent = { email : emailParameter };

        // This is where the POST request to the backend REST service is made.
        try {
            $http.post('/api/account/forgot-password', emailToBeSent).then(
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

    $delegate.resetPassword = function (key) {
        var deferred = $q.defer();

        // This is where the PUT request to the backend REST service is made.
        try {
            $http.put('/api/account/reset-password?key='+ key).then(
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

    $log.debug("DAL:Forgot Password instantiated");
    return $delegate;
}]);
