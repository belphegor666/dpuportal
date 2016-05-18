"use strict";

angular.module("repository").decorator("repository", ["$delegate", "$q", "$log", "dal", "codeBook",
    function ($delegate, $q, $log, dal, codeBook) {

        $delegate.getUserCertifications = function () {

            var deferred = $q.defer();

            var userId = $delegate.getUserId();
            dal.getUserCertifications(userId).then(function (certifications) {
                certifications.forEach(function (certification) {
                    codeBook.findByLookupCode(certification.certificate).then(function (result) {
                        certification.description = result.description;
                        certification.shortDesc = result.shortDesc;
                    });
                });
                deferred.resolve(certifications);

            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        $delegate.saveCertification = function (certification) {
            var deferred = $q.defer();

            var userId = $delegate.getUserId();
            delete certification.shortDesc;
            dal.saveCertification(userId, certification).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        return $delegate;
    }]);
