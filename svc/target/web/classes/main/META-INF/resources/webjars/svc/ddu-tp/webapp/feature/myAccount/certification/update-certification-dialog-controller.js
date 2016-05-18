"use strict";

angular.module("app").controller("updateCertificationDialogController", ["$scope", "$log", "$uibModalInstance", "certification",
    function ($scope, $log, $uibModalInstance, certification) {

    $scope.controllerName = "updateCertificationDialogController";

    $scope.percentComplete = undefined;
        $scope.certification = certification;

    $scope.updateCertification = function (form) {
        if(form.$valid) {
            $scope.certification.percentComplete = $scope.percentComplete;
            $uibModalInstance.close($scope.certification);
        } else {
            $scope.hasValidationError = true;
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
