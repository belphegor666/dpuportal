"use strict";

angular.module("app").controller("joinSprintDialogController", ["$scope", "$state", "$log", "$uibModalInstance", function ($scope, $state, $log, $uibModalInstance) {

    $scope.controllerName = "joinSprintDialogController";

    $scope.hasValidationError = false;

    $scope.jobRoles = $$refdata.JOB_ROLE;

    $scope.role = undefined;

    $scope.changeRole = function(newRole) {
        $scope.role = newRole;
    };

    $scope.joinSprint = function (form) {
        if(form.$valid) {
            $uibModalInstance.close($scope.role);
        } else {
            $scope.hasValidationError = true;
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);
