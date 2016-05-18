"use strict";

/**
 * Module decorator for the Data Access Layer (DAL) module, extended with changing the user account details.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    $delegate.editAccountDetails = function (credentials) {
        var deferred = $q.defer();

        // This is where the POST request to the backend REST service is made.
        try {
            //Creating a new object for user with only the details to be changed. Not using delete to prevent variable linking
            var userToBeUpdated = {};
            userToBeUpdated.email = credentials.email;
            userToBeUpdated.firstName = credentials.firstName;
            userToBeUpdated.lastName = credentials.lastName;
            userToBeUpdated.twitterUrl = credentials.twitterUrl;
            userToBeUpdated.linkedInUrl = credentials.linkedInUrl;

            $http.post('/api/account/user-details', userToBeUpdated).then(
                function (success) {
                    deferred.resolve(success.data);
                }, function (error) {
                    deferred.reject(error.data);
                }
            );
        } catch (exception) {
            deferred.reject(exception);
        }

        return deferred.promise;
    };

    $log.debug("DAL: User Preferences instantiated");
    return $delegate;
}]);
