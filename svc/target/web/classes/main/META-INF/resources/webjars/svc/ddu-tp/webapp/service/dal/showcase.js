"use strict";

/**
 * Showcase Data Access layer
 */
angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    $delegate.getShowcases = function () {
        var deferred = $q.defer();

        try {
            $http.get('/api/showcase').then(
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

    $log.debug("DAL:Showcase instantiated");
    return $delegate;
}]);
