"use strict";

/**
 * Module decorator for the Data Access Layer (DAL) module, extended with changing the user account details.
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    $delegate.editAccountDetails = function (credentials) {
        var deferred = $q.defer();

        deferred.resolve(credentials);

        return deferred.promise;
    };

    $log.debug("DAL: User Preferences instantiated");
    return $delegate;
}]);
