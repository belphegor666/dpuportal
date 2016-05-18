"use strict";

angular.module("app").controller("certificationController", ["$scope", "$state", "$stateParams", "$log", "repository", "codeBook", "$uibModal",
    function ($scope, $state, $stateParams, $log, repository, codeBook, $uibModal) {

        //Adds list of types of project status to scope
        codeBook.getCertificationTypes().then(function (result) {
            $scope.certificationTypes = result;
        });

        var updateCertifications = function(){
            $scope.certificate = {};
            repository.getUserCertifications().then(function (certifications) {
                $scope.certifications = certifications;
                //To default the first option as selected in dropdown.
                $scope.certificate.certificate = $scope.certificationTypes[0].lookupCode;

            }, function (error) {
                $scope.error = true;
                $scope.errorMessage = error;
            });
        };

        $scope.saveCertification = function (certificateForm) {
            $log.debug("certificationController: saveCertification");
            if (!$scope.certificate.percentComplete) {
                $scope.certificate.percentComplete = 0;
            }

            repository.saveCertification($scope.certificate).then(function () {
                updateCertifications();
                $log.debug("certificationController: saved successfully");
            }, function (error) {
                $log.debug("certificationController: error =" + error);
            });

        };

        $scope.updateCertification = function(certification) {
            $uibModal.open({
                templateUrl: 'feature/myAccount/certification/update-certification-dialog.html',
                controller: 'updateCertificationDialogController',
                resolve: {
                    certification: function () {
                        return certification;
                    }
                }
            }).result.then(function(certification) {
                    delete certification.description;
                    repository.saveCertification(certification).then(function () {
                        updateCertifications();
                        $log.debug("certificationController: saved successfully");
                    }, function (error) {
                        $log.debug("certificationController: error =" + error);
                    });
                });
        };

         // Function to determine which colour (bronze, silver or gold) should be used to render individual certifications
            $scope.getCertColor = function (certification) {
                // Examine the last part of the certificate code, from the '_' onwards, to get the colour code ('b', 's' or 'g')
                var certCode = certification.certificate;

                switch(certCode.substring(certCode.indexOf('_'))) {
                    case "_b":
                        return "cert-bronze";
                        break;
                    case "_s":
                        return "cert-silver";
                        break;
                    case "_g":
                        return "cert-gold";
                        break;
                    default:
                        break;
                }
            };

        updateCertifications();

    }]);
