"use strict";

angular.module("dal").decorator("dal", ["$delegate", "$q", "$log", "$http", function ($delegate, $q, $log, $http) {

    $delegate.getUserCertifications = function (userId) {
        var deferred = $q.defer();
        $http.get('/api/users/' + userId + '/certifications').then(
            function (certifications) {
                deferred.resolve(certifications.data);
                $log.debug("Dal-getUserCertifications : " + JSON.stringify(certifications));
            }, function (e) {
                deferred.reject(e);
                $log.error("DAL:getUserCertifications :" + JSON.stringify(e));
            });
        return deferred.promise;
    };

    $delegate.saveCertification = function(userId, certification) {
        var deferred = $q.defer();

        $http.post('/api/users/' + userId + '/certifications', certification).then(function(result){
            deferred.resolve(result.data);
        }, function(e){
            deferred.reject(e);
        });

        return deferred.promise;
    };


    return $delegate;

}]);