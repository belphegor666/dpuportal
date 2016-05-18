"use strict";

angular.module("app").controller("changePasswordController", ["$scope", "$state", "$stateParams", "$log", "dal", function ($scope, $state, $stateParams, $log, dal) {

    $scope.hasValidationError = false;
    $scope.credentials = {};

    $scope.saveUserPassword = function(form) {

        $scope.successText = null;
        $scope.errorText = null;

        if(form.$valid) {
            dal.changePassword($scope.credentials).then(function(success) {
                BootstrapDialog.show({
                    message: 'Password has been successfully changed',
                    type: BootstrapDialog.TYPE_SUCCESS,
                    buttons: [{
                        label: 'OK',
                        cssClass: 'btn-success',
                        action: function (dialogRef) {
                            dialogRef.close();
                            if($stateParams.homepage == "REQUIREMENT") {
                                $state.go("requirement-dashboard");
                            } else if($stateParams.homepage == "DEVELOPER") {
                                $state.go("home.developer.assigned-projects");
                            } else if($stateParams.homepage == "PROJECT") {
                                $state.go("home.join-project");
                            } else if($stateParams.homepage == "EXECUTIVE") {
                                $state.go("home.executive-dashboard");
                            } else {
                                $state.go("welcome.home");
                            }
                        }
                    }]
                });
            }, function(error) {
                $scope.errorText = error;
            });
        } else {
            $scope.hasValidationError = true;
        }
    }

}]);
